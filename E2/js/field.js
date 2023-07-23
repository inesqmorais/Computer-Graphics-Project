class Field extends GraphicEntity {

	constructor(materialBase, materialWall, fieldWidth, wallHeight) {
		super(0,0,0); 
		this.materialBase = materialBase;
		this.materialWall = materialWall;
		this.fieldWidth = fieldWidth;
		this.fieldDepht = this.fieldWidth/2;
		this.wallHeight = wallHeight;
		this.createField();
	}

	createBase() {
		geometry = new THREE.BoxGeometry(this.fieldWidth,1,this.fieldDepht); 
		mesh = new THREE.Mesh(geometry, this.materialBase);
		mesh.position.y -= 0.5;
		this.add(mesh);
	}

	createWallSide(xWall) {
		geometry = new THREE.BoxGeometry(1,this.wallHeight,this.fieldDepht); 
		mesh = new THREE.Mesh(geometry, this.materialWall);
		mesh.position.x = xWall;
		mesh.position.y += this.wallHeight/2;
		this.add(mesh);
	}

	createWallTop(zWall) {
		geometry = new THREE.BoxGeometry(this.fieldWidth,this.wallHeight,1); 
		mesh = new THREE.Mesh(geometry, this.materialWall);
		mesh.position.z = zWall;
		mesh.position.y += this.wallHeight/2;
		this.add(mesh);
	}

	createField() {
		this.createBase();
		this.createWallSide(-this.fieldWidth/2);
		this.createWallSide(this.fieldWidth/2);
		this.createWallTop(this.fieldDepht/2);
		this.createWallTop(-this.fieldDepht/2);
	} 
}