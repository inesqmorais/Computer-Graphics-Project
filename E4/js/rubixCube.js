class rubixCube extends GraphicEntity {

	constructor(x,y,z,width,height,depth,wSegments,hSegments,dSegments) {
		super(x,y,z);

		this.width = width;
		this.height = height;
		this.depth = depth;
		this.wSegments = wSegments;
		this.hSegments = hSegments;
		this.dSegments = dSegments;

		this.mesh;

		this.materialArray = [];
		this.startMaterial();
 
		this.createCube(); 
	}

	startMaterial() {
		var phongBlue = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('textures/blueFace.bmp'),bumpMap: new THREE.TextureLoader().load('textures/borders.bmp')}); //right
	    var phongWhite = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('textures/borders.bmp'),bumpMap: new THREE.TextureLoader().load('textures/borders.bmp')}); //left
	    var phongRed = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('textures/redFace.bmp'),bumpMap: new THREE.TextureLoader().load('textures/borders.bmp')}); //top
	    var phongGreen = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('textures/greenFace.bmp'),bumpMap: new THREE.TextureLoader().load('textures/borders.bmp')}); //bottom
	    var phongOrange = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('textures/orangeFace.bmp'),bumpMap: new THREE.TextureLoader().load('textures/borders.bmp')}); //front
	    var phongYellow = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('textures/yellowFace.bmp'),bumpMap: new THREE.TextureLoader().load('textures/borders.bmp')}); //back

	    var basicBlue = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('textures/blueFace.bmp')}); //right
	    var basicWhite = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('textures/borders.bmp')}); //left
	    var basicRed = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('textures/redFace.bmp')}); //top
	    var basicGreen = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('textures/greenFace.bmp')}); //bottom
	    var basicOrange = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('textures/orangeFace.bmp')}); //front
	    var basicYellow = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('textures/yellowFace.bmp')}); //back

	    this.materialArray[0] = new THREE.MeshFaceMaterial([phongBlue,phongWhite,phongRed,phongGreen,phongOrange,phongYellow]);
    	this.materialArray[1] = new THREE.MeshFaceMaterial([basicBlue,basicWhite,basicRed,basicGreen,basicOrange,basicYellow]);
	}

	createCube() {
		var geometry = new THREE.BoxGeometry( this.width,this.height,this.depth, this.wSegments, this.hSegments,this.dSegments);
    	this.mesh = new THREE.Mesh(geometry,this.materialArray[0]);
    	this.add(this.mesh);                             
	}

	phongMaterial() {
		this.mesh.material = this.materialArray[0];
	}

	basicMaterial() {
		this.mesh.material = this.materialArray[1];
	}

	changeWireframe() {
		for (let i = 0; i < 6; i++) {
			this.materialArray[0].materials[i].wireframe = !this.materialArray[0].materials[i].wireframe;
			this.materialArray[1].materials[i].wireframe = !this.materialArray[1].materials[i].wireframe;
		}
	}
}