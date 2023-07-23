class GraphicEntity extends THREE.Object3D{

	constructor(x,y,z){ 
		super();
		this.x = x;
		this.y = y;
		this.z = z;
		this.speed = 0;
		this.acceleration = 0.2;
	}

}