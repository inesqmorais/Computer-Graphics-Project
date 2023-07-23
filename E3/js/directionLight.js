class DirectLight extends THREE.DirectionalLight {

	constructor(color, intensity) {
		super(color, intensity);	//argumentos default 0xffffff e 1
		this.flag = 1;
	}

	changeFlag() {
		if (this.flag == 1)
			this.flag = 0;
		else
			this.flag = 1;
	}

	switch() {
		if (this.flag)
			this.visible = false;
		else 
			this.visible = true;
		
		this.changeFlag();
	}
}