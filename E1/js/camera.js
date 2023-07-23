class Camera extends THREE.OrthographicCamera{

	constructor(x,y,z,largura,altura,near,far) {
		super(largura / - 2, largura / 2, altura / 2, altura / - 2, near, far);   //(left,right,top,bottom,near,far)
		this.x = x;
		this.y = y;
		this.z = z;
		this.createCamera();
	}

	createCamera() {
		this.position.x = this.x; 
    	this.position.y = this.y;
    	this.position.z = this.z;
	}
}