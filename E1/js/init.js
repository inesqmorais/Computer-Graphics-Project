var camera, scene, renderer;
var camera_1, camera_2, camera_3;
var geometry, wireframe, mesh;
var material;
var table, chair, lamp;

//camera
var aspect = window.innerWidth / window.innerHeight;        // rácio entre largura e altura 
var viewSize = 90;                                          // "zoom" da camera (-> quanto maior, mais longe)
var width = viewSize * aspect;                              // resolução horizontal -> número de quadriculas por linha
var height = viewSize;                                      // resolução vertical -> número de linhas

//movement
var clock;


function createScene() {                                                     //cria objetos e adiciona à cena
    'use strict';
    scene = new THREE.Scene();                                                               //criação cena
    scene.add(new THREE.AxisHelper(10));                                                     //adicionar axis

    var grid = new THREE.GridHelper(100,15);                                                 //criação rede
    grid.position.y = - 25;
    scene.add(grid);

    var tableMaterial = new THREE.MeshBasicMaterial({color:0xaa7334, wireframe: false});     //mesa
    table = new Table(tableMaterial,0,-16.5,0,0,11,0,60,2,20,1,20,10,24,1.7,6);
    scene.add(table);

    var chairMaterial = new THREE.MeshBasicMaterial({color:0x212020, wireframe: false});      //cadeira
    chair = new Chair(chairMaterial,0, -5, 11,12, 1.2, 12, -13, 14, 12,18,1.2, 9, 6,0.07, 
                        0.6,9.6,1.2,15,-17.5,13.8,0.5,13,-22.6,13.8,15,Math.PI/2, 0.4, 
                        0.6, 15,30,6.3,0,6.4, -24.03,7.4,20.1,13.8,0,55,0);
    scene.add(chair);
    
    lamp = new Lamp( 44, 0, -5,false, 0xc6c2c2, 0x212020,  4.5, 2.7, 32, -23.5, 0.3,          //candeeiro
                    50, 14, 1, 1, 28, 32, 9, 1.2, 10, 8, 4, 11, 5, 7, 9, 28, 1, 6, 6.3, 22);
    scene.add(lamp);

}



function createCamera() {
    'use strict';

    flagArray[0] = 1;
	camera_1 = new Camera(0,1,0,width,height,-1000,1000);         //criação das três cameras ortograficas - topo
    camera_2 = new Camera(0,0,-1,width,height,-1000,1000);        //                                      - frontal
    camera_3 = new Camera(1,0,0,width,height,-1000,1000);         //                                      - lateral
	
    camera = camera_1;
	camera.lookAt(scene.position);

    trackballCamera = new THREE.PerspectiveCamera(70,window.innerWidth / window.innerHeight,1, 1000);  //trackball
    trackballCamera.position.x = 50;
    trackballCamera.position.y = 50;
    trackballCamera.position.z = 50;
    trackballCamera.lookAt(scene.position);
}



function render() {
    'use strict';
    if (flagArray[1]){                              //verifica se a flag de a camera trackball esta a true
       renderer.render(scene, trackballCamera);     //se sim renderiza a camera trackball
    }
    else {                                          // se não renderiza a camera norma
       renderer.render(scene, camera); 
    }
}


function init() { 
    'use strict';

    clock = new THREE.Clock(); //default its true

    renderer = new THREE.WebGLRenderer({antialias: true});           // criação renderer
    renderer.setSize(window.innerWidth, window.innerHeight);         // tamanho a que queremos renderizar (tamanho da janela)
    document.body.appendChild(renderer.domElement);                  // adicionar renderer ao HTML 
    renderer.setClearColor( 0xeae1c5,1);                             // mudar cor de background                          
   
    createScene();                                                   // criação da cena e dos objectos 

    createCamera();                                                   // criação das cameras 

    controls = new THREE.TrackballControls(trackballCamera);
    controls.addEventListener('change',render);
    
    render(); 

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);                      // chama a função onResize()
    window.addEventListener('keyup', onKeyUp);
}

