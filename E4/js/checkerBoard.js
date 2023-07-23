class checkerBoard extends GraphicEntity {

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

		this.createBoard(); 
		
	}

	startMaterial() {
		var phongWood = new THREE.MeshPhongMaterial({color:0xbc7f4d,map: new THREE.TextureLoader().load('textures/wood.jpg')});
    	var phongChess = new THREE.MeshPhongMaterial({color:0xedc6a6, map: new THREE.TextureLoader().load('textures/chess.bmp')});

    	var basicWood = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('textures/wood.jpg')});
    	var basicChess = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('textures/chess.bmp')});

    	this.materialArray[0] = new THREE.MeshFaceMaterial([phongWood,phongWood,phongChess,phongChess,phongWood,phongWood]);  // right,left, top, bottom, front, back
    	this.materialArray[1] = new THREE.MeshFaceMaterial([basicWood,basicWood,basicChess,basicChess,basicWood,basicWood]);
	}

	createBoard() {
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
		this.materialArray[0].materials[0].wireframe = !this.materialArray[0].materials[0].wireframe;
		this.materialArray[0].materials[2].wireframe = !this.materialArray[0].materials[2].wireframe;

		this.materialArray[1].materials[0].wireframe = !this.materialArray[1].materials[0].wireframe;
		this.materialArray[1].materials[2].wireframe = !this.materialArray[1].materials[2].wireframe;
	}
}