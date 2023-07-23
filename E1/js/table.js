class Table extends GraphicEntity {

	constructor(tableMaterial,x,y,z,tableTopX,tableTopY,tableTopZ,tableTopWidth,tableTopHeight,tableTopDepht,
				legBaseRadius,legHeight,legRadialSegments,legX,legY,legZ) {
		super(x,y,z); 
		this.material = tableMaterial;
		this.tableTopX = tableTopX; //0                        
		this.tableTopY = tableTopY; //11
		this.tableTopZ = tableTopZ; //0
		this.tableTopWidth = tableTopWidth; //60
		this.tableTopHeight = tableTopHeight; //2
		this.tableTopDepht = tableTopDepht; //20
		this.legBaseRadius = legBaseRadius; //1
		this.legHeight = legHeight; //20
		this.legRadialSegments = legRadialSegments; //4
		this.legX = legX; // 24
		this.legY = legY; //1.7
		this.legZ = legZ; //6
		this.createTable();
	}

	createTableTop() {
		geometry = new THREE.BoxGeometry(this.tableTopWidth,this.tableTopHeight,this.tableTopDepht); 
		mesh = new THREE.Mesh(geometry, this.material);
		mesh.position.set(this.tableTopX, this.tableTopY, this.tableTopZ);
		this.add(mesh);
	}

	createTableLeg(x,y,z) {
		geometry = new THREE.CylinderGeometry(this.legBaseRadius,this.legBaseRadius,this.legHeight,this.legRadialSegments);
		mesh = new THREE.Mesh( geometry, this.material );
		mesh.position.set(x,y,z);
		this.add(mesh);
	}

	createTable() {
		this.createTableTop();
    	this.createTableLeg(-this.legX, this.legY, -this.legZ);
    	this.createTableLeg(-this.legX, this.legY, this.legZ);
    	this.createTableLeg(this.legX, this.legY, this.legZ);
    	this.createTableLeg(this.legX, this.legY, -this.legZ);
    	this.position.set(this.x,this.y,this.z);                               
	} 
}