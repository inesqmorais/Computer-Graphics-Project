class Lamp extends GraphicEntity {

	constructor(x,y,z,wireframe,color1, color2, baseRadius,baseHeight,baseRadialSegments,baseY, postRadius,postHeight,
				postRadialSegments,postY,sphereRadius, sphereWidthSegments, sphereHeightSegments,sphereY,coneRadius,
				coneHeight,coneRadialSegments,coneHeightSegments, coneY, hatTopRadius,hatBottomRadius,hatHeight,
				hatRadialSegments,hatHeightSegments,hatThetaStart,hatThetaLenght,hatY) {
		super(x,y,z);   
		this.wireframe = wireframe;
		this.color1 = color1;
		this.color2 = color2;
		this.baseRadius = baseRadius;  //4.5
		this.baseHeight = baseHeight;  //2.7
		this.baseRadialSegments = baseRadialSegments; // 32
		this.baseY = baseY;  // -23.5
		this.postRadius = postRadius; //radiustop, radiusbottom 0.3
		this.postHeight = postHeight; // 50
		this.postRadialSegments = postRadialSegments; //14 
		this.postY = postY; //1
		this.sphereRadius = sphereRadius; //1
		this.sphereWidthSegments = sphereWidthSegments;//28
		this.sphereHeightSegments = sphereHeightSegments;//32
		this.sphereY = sphereY;   //9
		this.coneRadius = coneRadius//1.2
		this.coneHeight = coneHeight//10
		this.coneRadialSegments = coneRadialSegments;  // 8
		this.coneHeightSegments = coneHeightSegments;  //4
		this.coneY = coneY;  //11
		this.hatTopRadius = hatTopRadius;  //5
		this.hatBottomRadius = hatBottomRadius; //7
		this.hatHeight = hatHeight;  //9
		this.hatRadialSegments = hatRadialSegments; //28
		this.hatHeightSegments = hatHeightSegments; //1
		this.hatThetaStart = hatThetaStart; // 6
		this.hatThetaLenght = hatThetaLenght; //6.3
		this.hatY = hatY;//22
		this.createLamp();

	}


	createLampBase(){
		geometry = new THREE.ConeGeometry( this.baseRadius , this.baseHeight, this.baseRadialSegments );
		material = new THREE.MeshBasicMaterial({color:this.color1, wireframe: this.wireframe});                                                        
		mesh = new THREE.Mesh( geometry, material);
		mesh.position.set( this.x, this.baseY, this.z);
		this.add(mesh);
	} 

	createLampPost(){
		geometry = new THREE.CylinderGeometry( this.postRadius, this.postRadius, this.postHeight, this.postRadialSegments);
		material = new THREE.MeshBasicMaterial({color:this.color1, wireframe:this.wireframe}); 
		mesh = new THREE.Mesh( geometry, material);
		mesh.position.set(this.x, this.postY, this.z);
		this.add(mesh);
	 }


	createLampSphere(){
		geometry = new THREE.SphereGeometry( this.sphereRadius, this.sphereWidthSegments,this.sphereHeightSegments );
		material = new THREE.MeshBasicMaterial({color:this.color1, wireframe: this.wireframe}); 
		mesh = new THREE.Mesh( geometry, material);
		mesh.position.set(this.x, this.sphereY, this.z);
		this.add(mesh);
	 }


	createLampBottomHat(){
		geometry = new THREE.ConeGeometry( this.coneRadius, this.coneHeight, this.coneRadialSegments, this.coneHeightSegments)   
		material = new THREE.MeshBasicMaterial({color:this.color2, wireframe: this.wireframe});
		mesh = new THREE.Mesh( geometry, material);
		mesh.position.set(this.x, this.coneY, this.z);
		mesh.rotateX(Math.PI);
		this.add(mesh);
	 }

	createLampTopHat(){
		geometry = new THREE.CylinderGeometry( this.hatTopRadius, this.hatBottomRadius, this.hatHeight, 
												this.hatRadialSegments,this.hatHeightSegments,
												this.hatThetaStart,this.hatThetaLenght);
		material = new THREE.MeshBasicMaterial({color:this.color2, wireframe: this.wireframe});
		mesh = new THREE.Mesh( geometry, material);
		mesh.position.set(this.x, this.hatY , this.z);
		this.add(mesh);
	 }


	createLamp(){
		this.createLampBase();
		this.createLampPost();
		this.createLampSphere();
		this.createLampBottomHat();
		this.createLampTopHat();
		 
	}

}