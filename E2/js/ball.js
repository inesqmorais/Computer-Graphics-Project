class Ball extends GraphicEntity {

	constructor(material, radius, segments,tableWidth,tableHeight, ballNum) {
		super(0,0,0);

		this.tableWidth = tableWidth;
		this.tableHeight = tableHeight; 
		this.material = material;
		this.radius = radius;
		this.segments = segments;
		this.ballArray = [];
		this.flagBallAxis = 0;
		this.axisArray = [];
		this.speedArray = [];
		this.directionArray = [];
		this.initArray = [];
		this.axis;
		this.cameraBall;
		this.ballNum = ballNum;
		this.createBalls();
	}

	
	createBall(i) {
		geometry = new THREE.SphereGeometry(this.radius, this.segments, this.segments);
		mesh = new THREE.Mesh(geometry, this.material);

		if (i!=0) {
			this.startPosition(mesh,i);
		}

		this.add(mesh);
		return mesh;
	}

	createBalls() {
		for (let i = 0; i < this.ballNum; i++) {
			this.initArray[i] = this.ballArray[i] = this.createBall(i);
			this.speedArray[i] = Math.random();
			this.directionArray[i] = new THREE.Vector3(this.randomDirection(), 0, this.randomDirection());

			if (i == 0) {
				this.cameraBall = new GraphicEntity;
				this.cameraBall.add(this.ballArray[i]);
				this.startPosition(this.cameraBall,i);
				this.initArray[i] = this.cameraBall;
				this.add(this.cameraBall);
			}
		}
	}

	startPosition(mesh,i) {
		mesh.position.x = this.randomPosition(this.tableWidth);
		mesh.position.y = this.radius;
		mesh.position.z = this.randomPosition(this.tableHeight);

		for (let j = 0; j < i; j++) {
			if (this.hasCollision(mesh,this.initArray[j])) {
				this.startPosition(mesh,i);
			}
		}
	}

	randomDirection() {
		var num = Math.random();
		if (num >= 0.5)
			return num;
		else
			return -num;
	}

	randomPosition(dimension) {
		var number = Math.random() * (dimension + 1);		//retorna numero de 0 a dimension (inclusive)

		if (number >= dimension/2)
			return number/2 - this.radius - 0.5;
		else
			return -number + this.radius + 0.5;
	}

	switchAxis() {
		var ballAxis, object;

		if (this.flagBallAxis == 0) {
			for (let i = 0; i < this.ballNum; i++) { 
				ballAxis = new THREE.AxisHelper(2*this.radius);
				this.axisArray[i] = ballAxis.id;
				this.ballArray[i].add(ballAxis);
			}	
			this.flagBallAxis = 1;
		}

		else {
			for (let i = 0; i < this.ballNum; i++) {
				object = this.ballArray[i].getObjectById(this.axisArray[i]);
				this.ballArray[i].remove(object);
			}
			this.flagBallAxis = 0;
		}
	}

	movement() {
		this.axis = this.directionArray[0];
		this.ballArray[0].rotateOnAxis(this.createNormalAxis(this.directionArray[0].normalize()), this.speedArray[0]/this.radius);
		this.cameraBall.position.x += this.axis.x * this.speedArray[0];
		this.cameraBall.position.z += this.axis.z * this.speedArray[0];
		for (let i = 1; i < this.ballNum; i++) {

			this.axis = this.directionArray[i];

			this.ballArray[i].rotateOnAxis(this.createNormalAxis(this.directionArray[i].normalize()), this.speedArray[i]/this.radius);

			this.ballArray[i].position.x += this.axis.x * this.speedArray[i];
			this.ballArray[i].position.z += this.axis.z * this.speedArray[i];
		}
	}

	updateSpeedArray() {
		for (let i = 0; i < this.ballNum; i++) {
			this.speedArray[i] += this.speedArray[i]*0.5;	
		}
	}

	createNormalAxis(axis) {
		var rotate_axis = axis.clone();
    	var normal_axis = new THREE.Vector3(0, 1, 0);
    	rotate_axis.applyAxisAngle(normal_axis, Math.PI/2);
    	
    	return rotate_axis;
	}


	findCollisons() {
		this.hasWallCollision(this.cameraBall,0);
		for(let i = 1; i < this.ballNum; i++) {
			this.hasWallCollision(this.ballArray[i],i);
			if(this.hasCollision(this.cameraBall,this.ballArray[i])) {
				this.mecanicaNewton(this.cameraBall,this.ballArray[i],0,i);
				
			}
			
			for(let j = 1; j < this.ballNum; j++){
				if(i != j) {
					if(this.hasCollision(this.ballArray[i],this.ballArray[j])){
						this.mecanicaNewton(this.ballArray[i],this.ballArray[j],i,j);
						//camera_3.rotation.y = -90 * Math.PI / 180;
					}
				}
			}
		}
	}

	hasCollision(obj1,obj2) {
		return (Math.pow((2*(this.radius)), 2) >= Math.pow(obj1.position.x - obj2.position.x, 2) + Math.pow(obj1.position.z - obj2.position.z, 2))
	}

	hasWallCollision(obj,i) {
		
		if ( obj.position.x + this.radius >= this.tableWidth/2) {
			var tangentVector = new THREE.Vector3(-Math.abs(this.directionArray[i].getComponent(0)),0, this.directionArray[i].getComponent(2));
			this.directionArray[i] = tangentVector;
			//camera_3.rotation.y = -90 * Math.PI / 180;
		}

		if ( obj.position.x - this.radius <= -this.tableWidth/2) {
			var tangentVector = new THREE.Vector3(Math.abs(this.directionArray[i].getComponent(0)),0, this.directionArray[i].getComponent(2));
			this.directionArray[i] = tangentVector;
			//camera_3.rotation.y = -90 * Math.PI / 180;
		}

		if ( obj.position.z + this.radius >= this.tableHeight/2) {
			var tangentVector = new THREE.Vector3(this.directionArray[i].getComponent(0),0, -Math.abs(this.directionArray[i].getComponent(2)));
			this.directionArray[i] = tangentVector;
			//camera_3.rotation.y = -90 * Math.PI / 180;
		}

		if ( obj.position.z - this.radius <= -this.tableHeight/2) {
			var tangentVector = new THREE.Vector3(this.directionArray[i].getComponent(0),0, Math.abs(this.directionArray[i].getComponent(2)));
			this.directionArray[i] = tangentVector;
			//camera_3.rotation.y = -90 * Math.PI / 180;
		}
	}

	mecanicaNewton(obj1,obj2,i,j) {
		var xDistance = obj2.position.x - obj1.position.x;
    	var zDistance = obj2.position.z - obj1.position.z;

		var normalVector = new THREE.Vector3(xDistance,0,zDistance);
		normalVector = normalVector.normalize();

		var inverseVector = new THREE.Vector3(-xDistance,0,-zDistance);
		inverseVector = inverseVector.normalize();

		this.directionArray[i] = inverseVector.add(this.directionArray[i]);
		this.directionArray[j] = normalVector.add(this.directionArray[j]);
	}

}