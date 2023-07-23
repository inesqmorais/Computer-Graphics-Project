class Spotlight extends GraphicEntity {

	constructor(coneRadius, coneHeight, radialSegments, lampRadius, lampSegments) {
		super();
		this.coneRadius = coneRadius;
		this.coneHeight = coneHeight;
		this.radialSegments = radialSegments;
		
		this.lampRadius = lampRadius;
		this.lampSegments = lampSegments;
		
		this.baseMaterial = [];
		this.lampMaterial = [];
		this.baseArray = [];
		this.lampArray = [];

		this.startMaterial();

		this.lightArray = [];
		this.spotArray = [];		// 4 indexes, 1-on, 0-off
		this.createSpotlights();
	}

	startMaterial() {
		this.baseArray[0] = new THREE.MeshLambertMaterial({color:0x999999});
		this.baseArray[1] = new THREE.MeshPhongMaterial({color:0x999999});
		this.baseArray[2] = new THREE.MeshBasicMaterial({color:0x999999});
		
		this.lampArray[0] = new THREE.MeshLambertMaterial({color:0xfcca03});
		this.lampArray[1] = new THREE.MeshPhongMaterial({color:0xfcca03});
		this.lampArray[2] = new THREE.MeshBasicMaterial({color:0xfcca03});
	}

	createSpotlights() {
		this.createSpotlight(0,35,35,1,0,0);
		this.createSpotlight(0,30,-35,-1,0,1);
		this.createSpotlight(35,35,0,0,-1,2);
		this.createSpotlight(-35,30,0,0,1,3);
	}

	createLight(i) {
		var spotLight = new THREE.SpotLight( 0xffffff );
		spotLight.castShadow = true;

		this.lightArray[i] = spotLight;
		this.spotArray[i] = 1;
		return spotLight;
	}

	createSpotlight(x,y,z,dx,dz,i) {
		var spot = new GraphicEntity();
		spot.add(this.createBase(i));
		spot.add(this.createLamp(i));
	
		spot.rotateX(dx*Math.PI/3);
		spot.rotateZ(dz*Math.PI/3);
		spot.position.set(x,y,z);

		spot.add(this.createLight(i));
		this.add(spot);
		return spot;
	}

	createBase(i) {
		geometry = new THREE.ConeGeometry( this.coneRadius, this.coneHeight, this.radialSegments);
		mesh = new THREE.Mesh(geometry, this.baseArray[0]);
		this.baseMaterial[i] = mesh;
		return mesh;
	}

	createLamp(i) {
		geometry = new THREE.SphereGeometry(this.lampRadius, this.lampSegments, this.lampSegments);
		mesh = new THREE.Mesh(geometry, this.lampArray[0]);
		mesh.position.y = -3;
		this.lampMaterial[i] = mesh;
		return mesh;
	}

	spotSwitch(i) {
		if (this.spotArray[i] == 0) {
			this.lightArray[i].visible = true;
			this.spotArray[i] = 1;
		}
		else if (this.spotArray[i] == 1) {
			this.lightArray[i].visible = false;
			this.spotArray[i] = 0;
		}
	}

	lambertMaterial() {
		for (let i=0; i < 4; i++) {
			this.baseMaterial[i].material = this.baseArray[0];
			this.lampMaterial[i].material = this.lampArray[0];
		}
	}

	phongMaterial() {
		for (let i=0; i < 4; i++) {
			this.baseMaterial[i].material = this.baseArray[1];
			this.lampMaterial[i].material = this.lampArray[1];
		}
	}

	basicMaterial() {
		for (let i=0; i < 4; i++) {
			this.baseMaterial[i].material = this.baseArray[2];
			this.lampMaterial[i].material = this.lampArray[2];
		}
	}

	changeWireframe() {
		for (let i = 0; i < 3; i++) {
			this.baseArray[i].wireframe = !this.baseArray[i].wireframe;
			this.lampArray[i].wireframe = !this.lampArray[i].wireframe;
		}
	}

}