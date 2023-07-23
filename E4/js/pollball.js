class pollBall extends GraphicEntity {

	constructor(x,y,z,radius,segments) {
		super(x,y,z);

		this.radius = radius;
		this.segments = segments;
		
		this.direction;

		this.mesh;
		this.materialArray = [];
		this.startMaterial();

		this.createBall();
		this.speed;
		this.acceleration;
	}

	startMaterial() {
		this.materialArray[0] = new THREE.MeshPhongMaterial({shininess:12,specular:0x4C4C4C, map: new THREE.TextureLoader().load('textures/pool.png')});
		this.materialArray[1] = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('textures/pool.png')});
	}

	createBall() {
		this.speed = 0;
		this.acceleration = 0.01;
		var geometry = new THREE.SphereGeometry(this.radius, this.segments, this.segments);
    	this.mesh = new THREE.Mesh(geometry,this.materialArray[0]);

    	this.add(this.mesh);                           
	}

	movement(delta,direction) {

		if (direction == 1)
			this.speed = Math.min(0.1, this.speed + this.acceleration * delta);
		else
			this.speed = Math.max(0, this.speed - this.acceleration * delta);

		this.rotateX(this.speed);
		pivot.rotateY(-this.speed);
	}

	phongMaterial() {
		this.mesh.material = this.materialArray[0];
	}

	basicMaterial() {
		this.mesh.material = this.materialArray[1];
	}

	changeWireframe() {
		this.materialArray[0].wireframe = !this.materialArray[0].wireframe;
		this.materialArray[1].wireframe = !this.materialArray[1].wireframe;
	}

	startPosition() {
		
		this.speed = 0;

		if (this.rotation.y < 0)
    		pivot.rotation.y = Math.PI;
    	else
    		pivot.rotation.y = 0;

    	this.rotation.x = 0;
    	this.rotation.y = Math.PI/2;
    	this.rotation.z = 0;
	}
}