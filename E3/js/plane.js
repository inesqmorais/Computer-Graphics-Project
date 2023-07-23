class Plane extends GraphicEntity {

	constructor(x,y,z) {
		super(x,y,z);
		
		this.planeBodyArray = [];
		this.planeCockPitArray = [];
		this.planeWingArray = [];
		this.planeStabilizerArray = [];
		this.planeBarArray = [];

		this.startMaterial();
		
		this.planeBodyMaterial;
		this.planeCockPitMaterial;
		this.planeWingMaterial = [];
		this.planeStabilizerMaterial = [];
		this.planeBarMaterial = [];
 
		this.createPlane();
	}

	startMaterial() {
		this.planeBodyArray[0] = new THREE.MeshLambertMaterial({color:0x00ff00});
		this.planeBodyArray[1] = new THREE.MeshPhongMaterial({color:0x00ff00});
		this.planeBodyArray[2] = new THREE.MeshBasicMaterial({color:0x00ff00});

		this.planeCockPitArray[0] = new THREE.MeshLambertMaterial({color:0xff0000});
		this.planeCockPitArray[1] = new THREE.MeshPhongMaterial({color:0xff0000});
		this.planeCockPitArray[2] = new THREE.MeshBasicMaterial({color:0xff0000});

		this.planeWingArray[0] = new THREE.MeshLambertMaterial({color:0x0000ff});
		this.planeWingArray[1] = new THREE.MeshPhongMaterial({color:0x0000ff});
		this.planeWingArray[2] = new THREE.MeshBasicMaterial({color:0x0000ff});

		this.planeStabilizerArray[0] = new THREE.MeshLambertMaterial({color:0xffffff});
		this.planeStabilizerArray[1] = new THREE.MeshPhongMaterial({color:0xffffff});
		this.planeStabilizerArray[2] = new THREE.MeshBasicMaterial({color:0xffffff});

		this.planeBarArray[0] = new THREE.MeshLambertMaterial({color:0xa9a9a9});
		this.planeBarArray[1] = new THREE.MeshPhongMaterial({color:0xa9a9a9});
		this.planeBarArray[2] = new THREE.MeshBasicMaterial({color:0xa9a9a9});
	}


	createPlane() {
		this.createPlaneBody();
		this.createPlaneCockPit();
		this.createPlaneTeto()
		this.createPlaneLeftWing();
		this.createPlaneLeftBar();
		this.createPlaneLeftHorizontalStabilizers();
		this.createPlaneRightWing();
		this.createPlaneRightHorizontalStabilizers();
		this.createPlaneRightBar();
		this.createPlaneLeftBackWing();
		this.createPlaneLeftBackHorizontalStabilizers();
		this.createPlaneRightBackWing();
		this.createPlaneRightBackHorizontalStabilizers();
		this.createPlaneVerticalWing();
		this.createPlaneVerticalStabilizers();                             
	} 

	createPlaneBody() {
		geometry = new THREE.Geometry();


		//parte frontal
		geometry.vertices.push(new THREE.Vector3(-4,5,20)); //0
		geometry.vertices.push(new THREE.Vector3(4,5,20));  //1
		geometry.vertices.push(new THREE.Vector3(0,5,-25)); //2
		geometry.vertices.push(new THREE.Vector3(-3.8,1,20)); //3
		geometry.vertices.push(new THREE.Vector3(3.8,1,20));  //4

		geometry.faces.push(new THREE.Face3(0,3,1));
		geometry.faces.push(new THREE.Face3(1,3,4));

		geometry.vertices.push(new THREE.Vector3(2.7,1,-7)); //5   //5 e 6 fazem parte da parte lateral esquerda
		geometry.vertices.push(new THREE.Vector3(2.7,5,-3)); //6

		//cauda esquerda
		geometry.faces.push(new THREE.Face3(6,5,2));

		//fazem parte lateral direita 
		geometry.vertices.push(new THREE.Vector3(-2.7,1,-7)); //7
		geometry.vertices.push(new THREE.Vector3(-2.7,5,-3)); //8

		//cauda direita
		geometry.faces.push(new THREE.Face3(2,7,8));

		//parte de baixo
		geometry.faces.push(new THREE.Face3(5,4,3));
		geometry.faces.push(new THREE.Face3(3,7,5));
		geometry.faces.push(new THREE.Face3(2,5,7));

		//parte de cima
		geometry.vertices.push(new THREE.Vector3(2.8,5,-2)); //9
		geometry.faces.push(new THREE.Face3(0,1,9));

		geometry.vertices.push(new THREE.Vector3(-2.8,5,-2)); //10

		geometry.faces.push(new THREE.Face3(0,9,10));

		geometry.vertices.push(new THREE.Vector3(2.9,5,-2)); //11

		geometry.vertices.push(new THREE.Vector3(-2.9,5,-2)); //12

		geometry.faces.push(new THREE.Face3(12,11,2));


		//parte lateral esquerda

		geometry.vertices.push(new THREE.Vector3(3,1,-3)); //13

		geometry.faces.push(new THREE.Face3(13,5,6));

		geometry.vertices.push(new THREE.Vector3(2.8,5,-2));  //14

		geometry.faces.push(new THREE.Face3(14,13,6));

		geometry.vertices.push(new THREE.Vector3(3.2,1,-2));  //15

		geometry.faces.push(new THREE.Face3(13,14,15));

		geometry.vertices.push(new THREE.Vector3(2.9,5,0)); //16

		geometry.faces.push(new THREE.Face3(16,15,14));

		geometry.vertices.push(new THREE.Vector3(3.5,1,0)); //17

		geometry.faces.push(new THREE.Face3(15,16,17));

		geometry.vertices.push(new THREE.Vector3(3,5,2));  //18

		geometry.faces.push(new THREE.Face3(18,17,16));

		geometry.vertices.push(new THREE.Vector3(3.9,1,2));  //19

		geometry.faces.push(new THREE.Face3(17,18,19));
		
		geometry.vertices.push(new THREE.Vector3(3.1,5,4));  //20

		geometry.faces.push(new THREE.Face3(20,19,18));

		geometry.vertices.push(new THREE.Vector3(4.4,1,4));  //21

		geometry.faces.push(new THREE.Face3(19,20,21));


		geometry.vertices.push(new THREE.Vector3(3.2,5,6));  //22


		geometry.faces.push(new THREE.Face3(22,21,20));
		
		geometry.vertices.push(new THREE.Vector3(4.3,1,6));  //23

		geometry.faces.push(new THREE.Face3(21,22,23));

		geometry.vertices.push(new THREE.Vector3(3.35,5,8));  //24

		geometry.faces.push(new THREE.Face3(24,23,22));

		geometry.vertices.push(new THREE.Vector3(3.9,1,8));  //25

		geometry.faces.push(new THREE.Face3(23,24,25));

		geometry.vertices.push(new THREE.Vector3(3.4,5,10));  //26

		geometry.faces.push(new THREE.Face3(26,25,24));

		geometry.vertices.push(new THREE.Vector3(3.8,1,10));  //27

		geometry.faces.push(new THREE.Face3(25,26,27));

		geometry.vertices.push(new THREE.Vector3(3.5,5,12));  //28

		geometry.faces.push(new THREE.Face3(28,27,26));

		geometry.vertices.push(new THREE.Vector3(3.7,1,12));  //29

		geometry.faces.push(new THREE.Face3(27,28,29));

		geometry.vertices.push(new THREE.Vector3(3.6,5,14));  //30

		geometry.faces.push(new THREE.Face3(30,29,28));

		geometry.vertices.push(new THREE.Vector3(3.7,1,14));  //31

		geometry.faces.push(new THREE.Face3(29,30,31));

		geometry.vertices.push(new THREE.Vector3(3.7,5,16));  //32

		geometry.faces.push(new THREE.Face3(32,31,30));

		geometry.vertices.push(new THREE.Vector3(3.7,1,16));  //33

		geometry.faces.push(new THREE.Face3(31,32,33));

		geometry.vertices.push(new THREE.Vector3(3.8,5,18));  //34

		geometry.faces.push(new THREE.Face3(34,33,32));

		geometry.vertices.push(new THREE.Vector3(3.7,1,18));  //35

		geometry.faces.push(new THREE.Face3(33,34,35));

		geometry.faces.push(new THREE.Face3(35,34,1));

		geometry.faces.push(new THREE.Face3(1,4,35));


		//parte lateral direita

		//parte lateral esquerda 5->7  6->8

			geometry.vertices.push(new THREE.Vector3(-3,1,-3)); //36

		geometry.faces.push(new THREE.Face3(8,7,36));

		geometry.vertices.push(new THREE.Vector3(-2.8,5,-2));  //37

		geometry.faces.push(new THREE.Face3(8,36,37));

		geometry.vertices.push(new THREE.Vector3(-3.2,1,-2));  //38

		geometry.faces.push(new THREE.Face3(38,37,36));

		geometry.vertices.push(new THREE.Vector3(-2.9,5,0)); //39

		geometry.faces.push(new THREE.Face3(37,38,39));

		geometry.vertices.push(new THREE.Vector3(-3.5,1,0)); //40

		geometry.faces.push(new THREE.Face3(40,39,38));

		geometry.vertices.push(new THREE.Vector3(-3,5,2));  //41

		geometry.faces.push(new THREE.Face3(39,40,41));

		geometry.vertices.push(new THREE.Vector3(-3.9,1,2));  //42

		geometry.faces.push(new THREE.Face3(42,41,40));
		
		geometry.vertices.push(new THREE.Vector3(-3.1,5,4));  //43

		geometry.faces.push(new THREE.Face3(41,42,43));

		geometry.vertices.push(new THREE.Vector3(-4.4,1,4));  //44

		geometry.faces.push(new THREE.Face3(44,43,42));


		geometry.vertices.push(new THREE.Vector3(-3.2,5,6));  //45


		geometry.faces.push(new THREE.Face3(43,44,45));
		
		geometry.vertices.push(new THREE.Vector3(-4.3,1,6));  //46

		geometry.faces.push(new THREE.Face3(46,45,44));

		geometry.vertices.push(new THREE.Vector3(-3.35,5,8));  //47

		geometry.faces.push(new THREE.Face3(45,46,47));

		geometry.vertices.push(new THREE.Vector3(-3.9,1,8));  //48

		geometry.faces.push(new THREE.Face3(48,47,46));

		geometry.vertices.push(new THREE.Vector3(-3.4,5,10));  //49

		geometry.faces.push(new THREE.Face3(47,48,49));

		geometry.vertices.push(new THREE.Vector3(-3.8,1,10));  //50

		geometry.faces.push(new THREE.Face3(50,49,48));

		geometry.vertices.push(new THREE.Vector3(-3.5,5,12));  //51

		geometry.faces.push(new THREE.Face3(49,50,51));

		geometry.vertices.push(new THREE.Vector3(-3.7,1,12));  //52

		geometry.faces.push(new THREE.Face3(52,51,50));

		geometry.vertices.push(new THREE.Vector3(-3.6,5,14));  //53

		geometry.faces.push(new THREE.Face3(51,52,53));

		geometry.vertices.push(new THREE.Vector3(-3.7,1,14));  //54

		geometry.faces.push(new THREE.Face3(54,53,52));

		geometry.vertices.push(new THREE.Vector3(-3.7,5,16));  //55

		geometry.faces.push(new THREE.Face3(53,54,55));

		geometry.vertices.push(new THREE.Vector3(-3.7,1,16));  //56

		geometry.faces.push(new THREE.Face3(56,55,54));

		geometry.vertices.push(new THREE.Vector3(-3.8,5,18));  //57

		geometry.faces.push(new THREE.Face3(55,56,57));

		geometry.vertices.push(new THREE.Vector3(-3.7,1,18));  //58

		geometry.faces.push(new THREE.Face3(58,57,56));

		geometry.faces.push(new THREE.Face3(0,57,58));

		geometry.faces.push(new THREE.Face3(58,3,0));


		geometry.faces.push(new THREE.Face3(4,5,21));

		geometry.faces.push(new THREE.Face3(44,7,3));	
		
		geometry.computeFaceNormals();

		mesh = new THREE.Mesh(geometry, this.planeBodyArray[0]);
		this.add(mesh);
		this.planeBodyMaterial = mesh;
	}

	createPlaneCockPit() {
		geometry = new THREE.Geometry();

		//vidro lateral esquerdo
		geometry.vertices.push(new THREE.Vector3(3.45,5,10)); //0
		geometry.vertices.push(new THREE.Vector3(2.8,5,-2));  //1
		geometry.vertices.push(new THREE.Vector3(2.9,8,8)); //2
		
		geometry.faces.push(new THREE.Face3(0,1,2));

		geometry.vertices.push(new THREE.Vector3(2.5,6.7,0)); //3
		geometry.faces.push(new THREE.Face3(3,2,1));


		//vidro lateral direito 
		geometry.vertices.push(new THREE.Vector3(-3.45,5,10)); //4
		geometry.vertices.push(new THREE.Vector3(-2.8,5,-2));  //5
		geometry.vertices.push(new THREE.Vector3(-2.9,8,8)); //6
		
		geometry.faces.push(new THREE.Face3(6,5,4));

		geometry.vertices.push(new THREE.Vector3(-2.5,6.7,0)); //7
		geometry.faces.push(new THREE.Face3(5,6,7));

		//vidro frontal
		geometry.faces.push(new THREE.Face3(0,2,4));
		geometry.faces.push(new THREE.Face3(6,4,2));

		//vidro de tras
		geometry.faces.push(new THREE.Face3(5,3,1));
		geometry.faces.push(new THREE.Face3(3,5,7));

		geometry.computeFaceNormals();

		mesh = new THREE.Mesh(geometry, this.planeCockPitArray[0]);
		this.add(mesh);
		this.planeCockPitMaterial = mesh;
	}

	createPlaneTeto() {
		geometry = new THREE.Geometry();

		geometry.vertices.push(new THREE.Vector3(2.9,8,8)); //0
		geometry.vertices.push(new THREE.Vector3(2.5,6.7,0)); //1
		geometry.vertices.push(new THREE.Vector3(-2.9,8,8)); //2
		geometry.vertices.push(new THREE.Vector3(-2.5,6.7,0)); //3

		geometry.faces.push(new THREE.Face3(0,1,2));
		geometry.faces.push(new THREE.Face3(3,2,1));

		geometry.computeFaceNormals();

		mesh = new THREE.Mesh(geometry, this.planeWingArray[0]);
		this.add(mesh);
		this.planeWingMaterial[0] = mesh;

	}

	createPlaneLeftWing() {
		geometry = new THREE.Geometry();

		//seccao A
		geometry.vertices.push(new THREE.Vector3(2.9,8,8)); //0
		geometry.vertices.push(new THREE.Vector3(2.5,6.7,0));  //1
		geometry.vertices.push(new THREE.Vector3(4,6.7,0));  //2
		
		geometry.faces.push(new THREE.Face3(0,1,2));
		geometry.faces.push(new THREE.Face3(2,1,0));

		geometry.vertices.push(new THREE.Vector3(4,8,8));  //3
		geometry.faces.push(new THREE.Face3(3,2,0));
		geometry.faces.push(new THREE.Face3(0,2,3));

		//seccao B
		geometry.vertices.push(new THREE.Vector3(23,8,8)); //4
		geometry.vertices.push(new THREE.Vector3(23,7,2)); //5
		
		geometry.faces.push(new THREE.Face3(3,4,5));
		geometry.faces.push(new THREE.Face3(5,4,3));

		geometry.vertices.push(new THREE.Vector3(4,7,2)); //6

		geometry.faces.push(new THREE.Face3(3,5,6));
		geometry.faces.push(new THREE.Face3(6,5,3));

		//seccao C
		geometry.vertices.push(new THREE.Vector3(24,8,8)); //7
		
		geometry.faces.push(new THREE.Face3(4,7,5));
		geometry.faces.push(new THREE.Face3(5,7,4));

		geometry.vertices.push(new THREE.Vector3(25,7,2)); //8
		geometry.faces.push(new THREE.Face3(5,7,8));
		geometry.faces.push(new THREE.Face3(8,7,5));

		//seccao D
		geometry.vertices.push(new THREE.Vector3(25.33,6.7,0));  //9
		geometry.faces.push(new THREE.Face3(5,8,9));
		geometry.faces.push(new THREE.Face3(9,8,5));

		geometry.vertices.push(new THREE.Vector3(23,6.7,0));  //10
		geometry.faces.push(new THREE.Face3(5,9,10));
		geometry.faces.push(new THREE.Face3(10,9,5));

		//seccao E
		geometry.vertices.push(new THREE.Vector3(14,7,2)); //11
		geometry.vertices.push(new THREE.Vector3(14,6.7,0));  //12
		geometry.vertices.push(new THREE.Vector3(13.5,7,2));  //13
		
		geometry.faces.push(new THREE.Face3(11,12,13));
		geometry.faces.push(new THREE.Face3(13,12,11));

		geometry.vertices.push(new THREE.Vector3(13.5,6.7,0));  //14

		geometry.faces.push(new THREE.Face3(14,13,12));
		geometry.faces.push(new THREE.Face3(12,13,14));


		
		geometry.computeFaceNormals();

		mesh = new THREE.Mesh(geometry, this.planeWingArray[0]);
		this.add(mesh);
		this.planeWingMaterial[1] = mesh;
	}


	createPlaneLeftHorizontalStabilizers() {
		geometry = new THREE.Geometry();

		//estabilizador 1
		geometry.vertices.push(new THREE.Vector3(23,7,2)); //0
		geometry.vertices.push(new THREE.Vector3(23,6.7,0));  //1
		geometry.vertices.push(new THREE.Vector3(14,7,2)); //2

		geometry.faces.push(new THREE.Face3(0,1,2));
		geometry.faces.push(new THREE.Face3(2,1,0));

		geometry.vertices.push(new THREE.Vector3(14,6.7,0));  //3

		geometry.faces.push(new THREE.Face3(1,2,3));
		geometry.faces.push(new THREE.Face3(3,2,1));

		//estabilizador 2

		geometry.vertices.push(new THREE.Vector3(4,6.7,0));  //4
		geometry.vertices.push(new THREE.Vector3(4,7,2));   //5
		geometry.vertices.push(new THREE.Vector3(13.5,7,2));  //6

		geometry.faces.push(new THREE.Face3(4,5,6));
		geometry.faces.push(new THREE.Face3(6,5,4));

		geometry.vertices.push(new THREE.Vector3(13.5,6.7,0));  //7

		geometry.faces.push(new THREE.Face3(4,6,7));
		geometry.faces.push(new THREE.Face3(7,6,4));



		geometry.computeFaceNormals();

		mesh = new THREE.Mesh(geometry, this.planeStabilizerArray[0]);
		this.add(mesh);
		this.planeStabilizerMaterial[0] = mesh;

	}

	createPlaneLeftBar() {
		geometry = new THREE.Geometry();

		geometry.vertices.push(new THREE.Vector3(15,7.5,5)); //0
		geometry.vertices.push(new THREE.Vector3(3.2,1,6.5)); //1
		
		geometry.faces.push(new THREE.Face3(0,1,1));
		geometry.faces.push(new THREE.Face3(1,1,0));
		
		geometry.computeFaceNormals();

		mesh = new THREE.Mesh(geometry, this.planeBarArray[0]);
		this.add(mesh);
		this.planeBarMaterial[0] = mesh;
	}


	createPlaneRightWing() {
		geometry = new THREE.Geometry();

		//seccao A
		geometry.vertices.push(new THREE.Vector3(-2.9,8,8)); //0
		geometry.vertices.push(new THREE.Vector3(-2.5,6.7,0));  //1
		geometry.vertices.push(new THREE.Vector3(-4,6.7,0));  //2
		
		geometry.faces.push(new THREE.Face3(0,1,2));
		geometry.faces.push(new THREE.Face3(2,1,0));

		geometry.vertices.push(new THREE.Vector3(-4,8,8));  //3
		geometry.faces.push(new THREE.Face3(3,2,0));
		geometry.faces.push(new THREE.Face3(0,2,3));

		//seccao B
		geometry.vertices.push(new THREE.Vector3(-23,8,8)); //4
		geometry.vertices.push(new THREE.Vector3(-23,7,2)); //5
		
		geometry.faces.push(new THREE.Face3(3,4,5));
		geometry.faces.push(new THREE.Face3(5,4,3));

		geometry.vertices.push(new THREE.Vector3(-4,7,2)); //6

		geometry.faces.push(new THREE.Face3(3,5,6));
		geometry.faces.push(new THREE.Face3(6,5,3));

		//seccao C
		geometry.vertices.push(new THREE.Vector3(-24,8,8)); //7
		
		geometry.faces.push(new THREE.Face3(4,7,5));
		geometry.faces.push(new THREE.Face3(5,7,4));

		geometry.vertices.push(new THREE.Vector3(-25,7,2)); //8
		geometry.faces.push(new THREE.Face3(5,7,8));
		geometry.faces.push(new THREE.Face3(8,7,5));

		//seccao D
		geometry.vertices.push(new THREE.Vector3(-25.33,6.7,0));  //9
		geometry.faces.push(new THREE.Face3(5,8,9));
		geometry.faces.push(new THREE.Face3(9,8,5));

		geometry.vertices.push(new THREE.Vector3(-23,6.7,0));  //10
		geometry.faces.push(new THREE.Face3(5,9,10));
		geometry.faces.push(new THREE.Face3(10,9,5));

		//seccao E
		geometry.vertices.push(new THREE.Vector3(-14,7,2)); //11
		geometry.vertices.push(new THREE.Vector3(-14,6.7,0));  //12
		geometry.vertices.push(new THREE.Vector3(-13.5,7,2));  //13
		
		geometry.faces.push(new THREE.Face3(11,12,13));
		geometry.faces.push(new THREE.Face3(13,12,11));

		geometry.vertices.push(new THREE.Vector3(-13.5,6.7,0));  //14

		geometry.faces.push(new THREE.Face3(14,13,12));
		geometry.faces.push(new THREE.Face3(12,13,14));


		
		geometry.computeFaceNormals();

		mesh = new THREE.Mesh(geometry, this.planeWingArray[0]);
		this.add(mesh);
		this.planeWingMaterial[2] = mesh;
	}


	createPlaneRightHorizontalStabilizers() {
		geometry = new THREE.Geometry();

		//estabilizador 1
		geometry.vertices.push(new THREE.Vector3(-23,7,2)); //0
		geometry.vertices.push(new THREE.Vector3(-23,6.7,0));  //1
		geometry.vertices.push(new THREE.Vector3(-14,7,2)); //2

		geometry.faces.push(new THREE.Face3(0,1,2));
		geometry.faces.push(new THREE.Face3(2,1,0));

		geometry.vertices.push(new THREE.Vector3(-14,6.7,0));  //3

		geometry.faces.push(new THREE.Face3(1,2,3));
		geometry.faces.push(new THREE.Face3(3,2,1));

		//estabilizador 2

		geometry.vertices.push(new THREE.Vector3(-4,6.7,0));  //4
		geometry.vertices.push(new THREE.Vector3(-4,7,2));   //5
		geometry.vertices.push(new THREE.Vector3(-13.5,7,2));  //6

		geometry.faces.push(new THREE.Face3(4,5,6));
		geometry.faces.push(new THREE.Face3(6,5,4));

		geometry.vertices.push(new THREE.Vector3(-13.5,6.7,0));  //7

		geometry.faces.push(new THREE.Face3(4,6,7));
		geometry.faces.push(new THREE.Face3(7,6,4));



		geometry.computeFaceNormals();

		mesh = new THREE.Mesh(geometry, this.planeStabilizerArray[0]);
		this.add(mesh);
		this.planeStabilizerMaterial[1] = mesh;

	}

	createPlaneRightBar() {
		geometry = new THREE.Geometry();

		geometry.vertices.push(new THREE.Vector3(-15,7.5,5)); //0
		geometry.vertices.push(new THREE.Vector3(-3.2,1,6.5)); //1
		
		geometry.faces.push(new THREE.Face3(0,1,1));
		geometry.faces.push(new THREE.Face3(1,1,0));
		
		geometry.computeFaceNormals();

		mesh = new THREE.Mesh(geometry,  this.planeBarArray[0]);
		this.add(mesh);
		this.planeBarMaterial[1] = mesh;
	}

	createPlaneLeftBackWing() {

		geometry = new THREE.Geometry();

		//seccao A
		geometry.vertices.push(new THREE.Vector3(0.12,5,-24)); //0
		geometry.vertices.push(new THREE.Vector3(0.75,5,-19)); //1
		geometry.vertices.push(new THREE.Vector3(1,5,-23.5)); //2
		
		geometry.faces.push(new THREE.Face3(0,1,2));
		geometry.faces.push(new THREE.Face3(2,1,0));

		//seccao B
		geometry.vertices.push(new THREE.Vector3(5.26,5,-25)); //3
		geometry.faces.push(new THREE.Face3(1,2,3));
		geometry.faces.push(new THREE.Face3(3,2,1));

		//seccao C
		geometry.vertices.push(new THREE.Vector3(6,5,-22)); //4
		geometry.vertices.push(new THREE.Vector3(6,5,-26)); //5

		geometry.faces.push(new THREE.Face3(1,4,5));
		geometry.faces.push(new THREE.Face3(5,4,1));

		//seccao D
		geometry.vertices.push(new THREE.Vector3(5.5,5,-25.8)); //6
		
		geometry.faces.push(new THREE.Face3(3,5,6));
		geometry.faces.push(new THREE.Face3(6,5,3));

		//seccao E
		geometry.vertices.push(new THREE.Vector3(1.13,5,-24.25)); //7
		geometry.faces.push(new THREE.Face3(0,2,7));
		geometry.faces.push(new THREE.Face3(7,2,0));

		geometry.computeFaceNormals();

		mesh = new THREE.Mesh(geometry, this.planeWingArray[0]);
		this.add(mesh);
		this.planeWingMaterial[3] = mesh;
	}

	createPlaneLeftBackHorizontalStabilizers() {

		geometry = new THREE.Geometry();

		geometry.vertices.push(new THREE.Vector3(1.13,5,-24.25)); //0
		geometry.vertices.push(new THREE.Vector3(1,5,-23.5));  //1
		geometry.vertices.push(new THREE.Vector3(5.5,5,-25.8)); //2

		geometry.faces.push(new THREE.Face3(0,1,2));
		geometry.faces.push(new THREE.Face3(2,1,0));

		geometry.vertices.push(new THREE.Vector3(5.26,5,-25)); //3

		geometry.faces.push(new THREE.Face3(1,2,3));
		geometry.faces.push(new THREE.Face3(3,2,1));

		geometry.computeFaceNormals();

		mesh = new THREE.Mesh(geometry, this.planeStabilizerArray[0]);
		this.add(mesh);
		this.planeStabilizerMaterial[2] = mesh;

	}


	createPlaneRightBackWing() {

		geometry = new THREE.Geometry();

		//seccao A
		geometry.vertices.push(new THREE.Vector3(-0.12,5,-24)); //0
		geometry.vertices.push(new THREE.Vector3(-0.75,5,-19)); //1
		geometry.vertices.push(new THREE.Vector3(-1,5,-23.5)); //2
		
		geometry.faces.push(new THREE.Face3(0,1,2));
		geometry.faces.push(new THREE.Face3(2,1,0));

		//seccao B
		geometry.vertices.push(new THREE.Vector3(-5.26,5,-25)); //3
		geometry.faces.push(new THREE.Face3(1,2,3));
		geometry.faces.push(new THREE.Face3(3,2,1));

		//seccao C
		geometry.vertices.push(new THREE.Vector3(-6,5,-22)); //4
		geometry.vertices.push(new THREE.Vector3(-6,5,-26)); //5

		geometry.faces.push(new THREE.Face3(1,4,5));
		geometry.faces.push(new THREE.Face3(5,4,1));

		//seccao D
		geometry.vertices.push(new THREE.Vector3(-5.5,5,-25.8)); //6
		
		geometry.faces.push(new THREE.Face3(3,5,6));
		geometry.faces.push(new THREE.Face3(6,5,3));

		//seccao E
		geometry.vertices.push(new THREE.Vector3(-1.13,5,-24.25)); //7
		geometry.faces.push(new THREE.Face3(0,2,7));
		geometry.faces.push(new THREE.Face3(7,2,0));

		geometry.computeFaceNormals();

		mesh = new THREE.Mesh(geometry, this.planeWingArray[0]);
		this.add(mesh);
		this.planeWingMaterial[4] = mesh;

	}

	createPlaneRightBackHorizontalStabilizers() {

		geometry = new THREE.Geometry();

		geometry.vertices.push(new THREE.Vector3(-1.13,5,-24.25)); //0
		geometry.vertices.push(new THREE.Vector3(-1,5,-23.5));  //1
		geometry.vertices.push(new THREE.Vector3(-5.5,5,-25.8)); //2

		geometry.faces.push(new THREE.Face3(0,1,2));
		geometry.faces.push(new THREE.Face3(2,1,0));

		geometry.vertices.push(new THREE.Vector3(-5.26,5,-25)); //3

		geometry.faces.push(new THREE.Face3(1,2,3));
		geometry.faces.push(new THREE.Face3(3,2,1));

		geometry.computeFaceNormals();

		mesh = new THREE.Mesh(geometry, this.planeStabilizerArray[0]);
		this.add(mesh);
		this.planeStabilizerMaterial[3] = mesh;

	}

	createPlaneVerticalWing() {

		geometry = new THREE.Geometry();

		//seccao A
		geometry.vertices.push(new THREE.Vector3(0,5,-24)); //0
		geometry.vertices.push(new THREE.Vector3(0,5,-18)); //1
		geometry.vertices.push(new THREE.Vector3(0,5.83,-23.5)); //2

		
		geometry.faces.push(new THREE.Face3(0,1,2));
		geometry.faces.push(new THREE.Face3(2,1,0));

		//seccao B
		geometry.vertices.push(new THREE.Vector3(0,10.34,-25)); //3
		geometry.faces.push(new THREE.Face3(1,2,3));
		geometry.faces.push(new THREE.Face3(3,2,1));

		//seccao C
		geometry.vertices.push(new THREE.Vector3(0,11,-22)); //4
		geometry.vertices.push(new THREE.Vector3(0,11.1,-26)); //5

		geometry.faces.push(new THREE.Face3(1,4,5));
		geometry.faces.push(new THREE.Face3(5,4,1));

		//seccao D
		geometry.vertices.push(new THREE.Vector3(0,10.5,-25.8)); //6
		
		geometry.faces.push(new THREE.Face3(3,5,6));
		geometry.faces.push(new THREE.Face3(6,5,3));

		//seccao E
		geometry.vertices.push(new THREE.Vector3(0,5.88,-24.25)); //7
		geometry.faces.push(new THREE.Face3(0,2,7));
		geometry.faces.push(new THREE.Face3(7,2,0));

		geometry.computeFaceNormals();

		mesh = new THREE.Mesh(geometry, this.planeWingArray[0]);
		this.add(mesh);
		this.planeWingMaterial[5] = mesh;
	}


	createPlaneVerticalStabilizers() {

		geometry = new THREE.Geometry();

		geometry.vertices.push(new THREE.Vector3(0,5.88,-24.25)); //0
		geometry.vertices.push(new THREE.Vector3(0,5.83,-23.5)); //1
		geometry.vertices.push(new THREE.Vector3(0,10.5,-25.8)); //2

		geometry.faces.push(new THREE.Face3(0,1,2));
		geometry.faces.push(new THREE.Face3(2,1,0));

		geometry.vertices.push(new THREE.Vector3(0,10.34,-25)); //3

		geometry.faces.push(new THREE.Face3(1,2,3));
		geometry.faces.push(new THREE.Face3(3,2,1));

		geometry.computeFaceNormals();

		mesh = new THREE.Mesh(geometry, this.planeStabilizerArray[0]);
		this.add(mesh);
		this.planeStabilizerMaterial[4] = mesh;
	}


	movement(delta) {
		var angle = 20 * Math.PI/90 * delta;
		//movimento cadeira (assento e costas) para a esquerda (->rotação)
    	if(flagArray[4] == 1)                         
       		this.rotateY(angle);

    	//movimento cadeira (assento e costas) para a direita(->rotação)
    	else if(flagArray[5] == 1)                    
    		this.rotateY(-angle);

    	//movimento para a frente
    	if(flagArray[2] == 1) { 
    		this.rotateX(angle);
        	                 
    	}                                                    // ao longo de ume eixo (-> vetor normalizado da cadeira)

   	 	//movimento para trás
   		else if(flagArray[3] == 1) {                
        	this.rotateX(-angle);
    	}
	}

	lambertMaterial() {
		this.planeBodyMaterial.material = this.planeBodyArray[0];
		this.planeCockPitMaterial.material = this.planeCockPitArray[0];
		
		for (let i=0; i < 6; i++) {
			this.planeWingMaterial[i].material = this.planeWingArray[0];
		}

		for (let i=0; i < 5; i++) {
			this.planeStabilizerMaterial[i].material = this.planeStabilizerArray[0];
		}

		for (let i=0; i < 2; i++) {
			this.planeBarMaterial[i].material = this.planeBarArray[0];
		}
	}

	phongMaterial() {
		this.planeBodyMaterial.material = this.planeBodyArray[1];
		this.planeCockPitMaterial.material = this.planeCockPitArray[1];
		
		for (let i=0; i < 6; i++) {
			this.planeWingMaterial[i].material = this.planeWingArray[1];
		}

		for (let i=0; i < 5; i++) {
			this.planeStabilizerMaterial[i].material = this.planeStabilizerArray[1];
		}

		for (let i=0; i < 2; i++) {
			this.planeBarMaterial[i].material = this.planeBarArray[1];
		}
	}

	basicMaterial() {
		this.planeBodyMaterial.material = this.planeBodyArray[2];
		this.planeCockPitMaterial.material = this.planeCockPitArray[2];
		
		for (let i=0; i < 6; i++) {
			this.planeWingMaterial[i].material = this.planeWingArray[2];
		}

		for (let i=0; i < 5; i++) {
			this.planeStabilizerMaterial[i].material = this.planeStabilizerArray[2];
		}

		for (let i=0; i < 2; i++) {
			this.planeBarMaterial[i].material = this.planeBarArray[2];
		}
	}

	changeWireframe() {
		for (let i = 0; i < 3; i++) {
			this.planeBodyArray[i].wireframe = !this.planeBodyArray[i].wireframe;
			this.planeCockPitArray[i].wireframe = !this.planeCockPitArray[i].wireframe;
			this.planeWingArray[i].wireframe = !this.planeWingArray[i].wireframe;
			this.planeStabilizerArray[i].wireframe = !this.planeStabilizerArray[i].wireframe;
		}
	}
}