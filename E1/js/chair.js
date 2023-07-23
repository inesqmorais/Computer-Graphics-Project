class Chair extends GraphicEntity {

	constructor(material,x,y,z,seatWidth, seatHeight,seatDepht,seatY,seatZ,backWidth,backHeight,backDepth,
				backY,backZ,backRotate,supportRadius,supportHeight,supportDepht,supportRadialSegments,supportY, 
				supportZ,legRadius,legHeight,legY, legZ,legRadialSegments, rotate ,wheelRadius,wheelTube,
				wheelRadialSegments,wheeltubularSegments,wheelArc,verticalWheelX,horizontalWheelX, wheelY,
				verticalWheelZ1,verticalWheelZ2,horizontalWheelZ,wheelRotate1,wheelRotate2,wheelChildPosition){
		super(x,y,z); 
		this.material = material;
		this.seatWidth = seatWidth;                //12
		this.seatHeight = seatHeight;              //1.2
		this.seatDepht = seatDepht;                //12
		this.seatY = seatY; //-13
		this.seatZ = seatZ; //14
		this.backWidth = backWidth; //12
		this.backHeight = backHeight;  //18
		this.backDepth = backDepth;    //1.2
		this.backY = backY; //-3.5
		this.backZ = backZ; //20
		this.backRotate = backRotate; //0.07
		this.supportRadius = supportRadius; // 0.6
		this.supportHeight = supportHeight; //9.6
		this.supportRadialSegments = supportRadialSegments; //15
		this.supportY = supportY; //-17.5
		this.supportZ = supportZ; //13.8
		this.legRadius = legRadius; // 0.5
		this.legHeight = legHeight; //13
		this.legY = legY; //-22.5
		this.legZ = legZ; //13.8
		this.legRadialSegments = legRadialSegments; //15
		this.rotate = rotate; //Math.PI/2
		this.wheelRadius = wheelRadius;  //0.4
		this.wheelTube = wheelTube; //0.6
		this.wheelRadialSegments = wheelRadialSegments; //15
		this.wheeltubularSegments = wheeltubularSegments;  //30
		this.wheelArc = wheelArc; //6.3
		this.verticalWheelX = verticalWheelX; //0
		this.horizontalWheelX = horizontalWheelX; //6.4
		this.wheelY= wheelY; //-24.03
		this.verticalWheelZ1 = verticalWheelZ1; //7.4
		this.verticalWheelZ2 = verticalWheelZ2; //20.1
		this.horizontalWheelZ = horizontalWheelZ; //13.8
		this.wheelRotate1 = wheelRotate1; //0
		this.wheelRotate2 = wheelRotate2; //55
		this.upperPart;                                 // upperPart = chairSeat + chairBack
		this.wheel = [];
		this.wheelC = [];
		this.wheelChildPosition = wheelChildPosition;
		this.createChair();
	}

	createChair() {
		this.createChairSeat();
		this.createChairBack();
    	this.createChairSupport();
    	this.createChairLeg1(this.rotate);
    	this.createChairLeg2(this.rotate);

   
    	for (let i = 0; i < 4; i++) {
    		this.wheelC[i] = this.createChairWheel(this.wheelChildPosition);
    		this.wheel[i] = new GraphicEntity();
    		this.wheel[i].add(this.wheelC[i]);
    	}
    	this.wheel[0].position.set(this.verticalWheelX, this.wheelY, this.verticalWheelZ1);
    	this.wheel[1].position.set(this.verticalWheelX, this.wheelY, this.verticalWheelZ2);
    	this.wheel[2].position.set(-this.horizontalWheelX, this.wheelY, this.horizontalWheelZ);
    	this.wheel[3].position.set(this.horizontalWheelX, this.wheelY, this.horizontalWheelZ);
    	for (let i = 0; i < 4; i++) {
    		this.add(this.wheel[i]);	
    	}
	}

	createChairSeat() {
		geometry = new THREE.CubeGeometry(this.seatWidth,this.seatHeight,this.seatDepht);
		this.upperPart = mesh = new THREE.Mesh(geometry, this.material);
		mesh.position.set(this.x, this.seatY, this.seatZ);
	}

	createChairBack() {
		geometry = new THREE.CubeGeometry(this.backWidth ,this.backHeight, this.backDepth);
		mesh = new THREE.Mesh(geometry, this.material);
		mesh.position.set(this.x,this.backY,this.backZ);
		mesh.rotateX(this.backRotate);
		this.upperPart.add(mesh);
		this.add(this.upperPart);
	}

	createChairSupport() {
		geometry = new THREE.CylinderGeometry(this.supportRadius,this.supportRadius, this.supportHeight,this.supportRadialSegments);
		mesh = new THREE.Mesh( geometry, this.material );
		mesh.position.set(this.x, this.supportY, this.supportZ); 
		this.add(mesh);
	}

	createChairLeg1(r) {  
		geometry = new THREE.CylinderGeometry(this.legRadius,this.legRadius, this.legHeight,this.legRadialSegments);
		mesh = new THREE.Mesh( geometry, this.material );
		mesh.position.set(this.x, this.legY, this.legZ); //this.legY
		mesh.rotateX(r);
		this.add(mesh);
	}

	createChairLeg2(r) { 
		geometry = new THREE.CylinderGeometry(this.legRadius,this.legRadius, this.legHeight,this.legRadialSegments);
		mesh = new THREE.Mesh( geometry, this.material );
		mesh.position.set(this.x, this.legY, this.legZ); //this.legY
		mesh.rotateZ(r);
		this.add(mesh);
	}

	createChairWheel(position) {
		geometry = new THREE.TorusGeometry( this.wheelRadius, this.wheelTube, this.wheelRadialSegments, this.wheeltubularSegments, this.wheelArc);
		mesh = new THREE.Mesh( geometry, this.material );
		mesh.position.set(position,position,position);
		mesh.rotateY(this.rotate);
		return mesh;
	}

	getRotYWheel() {							  //retorna rotação das rodas da cadeira no eixo do y
		return this.wheel[0].rotation.y;    
	}

	getRotYSeat(){                                //retorna rotação do assento e das costas da cadeira no eixo do y
		return this.upperPart.rotation.y;
	}

	getRotXSeat(){
		return this.upperPart.rotation.x;
	}

	rotateWheels(r) {
		var rot = r*(this.getRotYSeat() /*+ this.rotate*/);   // rotação do assento e costas da cadeira mais rotação inicial das rodas
		for(let i = 0; i < 4; i++)  {
			this.wheel[i].rotation.y = rot;
		}		
	}

	spinWheels(r,speed) {

		for(let i = 0; i < 4; i++)  {
			this.wheelC[i].rotateZ(r*speed);                   // roda anda à mesma velocidade que a cadeira
		}
	}

	rotateUpperPart(r) {                        // roda as costas e assento da cadeira para a direita e esquerda          
		this.upperPart.rotateY(r);              // no eixo do y   
	}											// rotateY() - Rotates the object around y axis in local space. 

	movement(delta) {
    	var angle = 20 * Math.PI/90 * delta;         // angle = acelaração * angulo * delta(move-se de acordo com os segundos do clock)
    	var matrix = new THREE.Matrix4();            // matriz do assento e costas da cadeira 
    	var vet;                                     // vetor normal da cadeira 

    	//movimento cadeira (assento e costas) para a esquerda ->rotação)
    	if(flagArray[4] == 1)                         
       		this.rotateUpperPart(angle);

    	//movimento cadeira (assento e costas) para a direita(->rotação)
    	else if(flagArray[5] == 1)                    
    		this.rotateUpperPart(-angle);

		matrix.extractRotation(this.upperPart.matrix);   //guarda rotação da cadeira na matriz
    	
    	//rotacao rodas para igualar a direção do upperPart (-> rotação Y) 
    	if (this.getRotYWheel() != this.getRotYSeat() + this.rotate && this.speed != 0) {   // se a rotação das rodas for diferente da cadeira
        	if (this.getRotXSeat() == 0)             // x é 0 -> angulo cadeira = angulo rodas                                     
            	this.rotateWheels(1);
        	else                                      // x diferent de 0 -> angulo cadeira = -angulo rodas (angulo rodas inverte)
            	this.rotateWheels(-1);
    	}

    	//movimento para a frente
    	if(flagArray[2] == 1) { 

        	if(flagArray[6] > 1) {        // se tiver acabado de premir a tecla para trás
            	flagArray[6] = 1;
        		this.speed = 0;
        	}

        	if (this.getRotXSeat() == 0)
        		this.spinWheels(-1,this.speed);          //wheelChild roda no eixo do z
        	else
        		this.spinWheels(1,this.speed);

			vet = new THREE.Vector3( 0, 0, -1);          //vetor da direção (da frente) da cadeira
			vet.applyProjection(matrix);                 //aplicar vetor à matriz

        	this.speed = Math.min(3, this.speed + this.acceleration * delta);    //equação do movimento uniformemente acelarado
        	this.translateOnAxis(vet,this.speed);       //faz a translação do objecto de acordo com a distancia(-> speed) 
    	}                                               // ao longo de um eixo (-> vetor normalizado da cadeira)


   	 	//movimento para trás
   		else if(flagArray[3] == 1) {                
        	
        	if(flagArray[6] < 2) {                    //se acabar de premir a tecla para a frente
        		flagArray[6] = 2;
        		this.speed = 0;
        	}

        	if (this.getRotXSeat() == 0)
        		this.spinWheels(1,this.speed);
        	else
        		this.spinWheels(-1,this.speed);

			vet = new THREE.Vector3( 0, 0, 1 );     
			vet.applyProjection(matrix);
        	this.speed = Math.min(3, this.speed + this.acceleration * delta);  //equação do movimento uniformemente acelarado
        	this.translateOnAxis(vet,this.speed);
    	}


    	//atrito
    	else {                                           //se nenhuma tecla for premida
    		if(flagArray[7] == -1) {                           //flag para saber se a tecla premida foi para andar para a frente ou para tras    
    			vet = new THREE.Vector3( 0, 0, -1 );
    			if (this.speed != 0) {
    				if (this.getRotXSeat() == 0)
        				this.spinWheels(-1,this.speed);
        			else
        				this.spinWheels(1,this.speed);
    			}
    		}
    		else {
    			vet = new THREE.Vector3( 0, 0, 1 );
    			if (this.speed != 0) {
    				if (this.getRotXSeat() == 0)
        				this.spinWheels(1,this.speed);
        			else
        				this.spinWheels(-1,this.speed);
    			}
    		}

			vet.applyProjection(matrix);
        
        	this.speed = Math.max(0, this.speed - this.acceleration * delta);    //equação do movimento uniformemente retardado
        	this.translateOnAxis(vet,this.speed);
    	}
	}
}