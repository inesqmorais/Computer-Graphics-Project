var camera, scene, renderer;
var camera_1, camera_2, camera_3;
var geometry, wireframe, mesh;
var material, grid;
var field, balls;

//camera
var aspect = window.innerWidth / window.innerHeight;        // rácio entre largura e altura 
var viewSize = 160;                                          // "zoom" da camera (-> quanto maior, mais longe)
var width = viewSize * aspect;                              // resolução horizontal -> número de quadriculas por linha
var height = viewSize;                                      // resolução vertical -> número de linhas


var fieldSize = 150;                                        // largura do campo
var wallHeight = Math.sqrt(Math.pow(fieldSize,2) + Math.pow(fieldSize/2,2))/10;
var ballNum = 10                                            // numero de bolas

//movement
var clock;
var materialArray = [];

function createScene() {                                                     //cria objetos e adiciona à cena
    'use strict';
    scene = new THREE.Scene();                                                               //criação cena
    scene.add(new THREE.AxisHelper(10));                                                     //adicionar axis

    materialArray[0] = new THREE.MeshBasicMaterial({color:0x005500, wireframe: false});
    materialArray[1] = new THREE.MeshBasicMaterial({color:0xffffff, wireframe: false});
    field = new Field(materialArray[0], materialArray[1], fieldSize, wallHeight);
    scene.add(field);

    materialArray[2] = new THREE.MeshBasicMaterial({color:0xaa7334, wireframe: false});
    balls = new Ball(materialArray[2], wallHeight/2, 32, fieldSize, fieldSize/2, ballNum);
    scene.add(balls);
}

function createCamera() {
    'use strict';
    flagArray[0] = 1;

    camera_1 = new THREE.OrthographicCamera(width/-2, width/2, height/2, height/-2, -50, 100);
    camera_1.position.set(0,1,0);

    camera_2 = new THREE.PerspectiveCamera(40, aspect, 1, 1000);
    camera_2.position.set(0,100,100);

    camera_3 = new THREE.PerspectiveCamera(100, aspect, 1, 1000);
    balls.cameraBall.add(camera_3);
    camera_3.position.y = 12;
    camera_3.position.z = wallHeight-9;
    //camera_3.rotation.y = -90 * Math.PI / 180;

    camera = camera_1;
    camera.lookAt(scene.position);

    trackballCamera = new THREE.PerspectiveCamera(70, aspect, 1, 1000);  //trackball
    trackballCamera.position.set(50,50,50);
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
    //renderer.setClearColor( 0xeae1c5,1);                           // mudar cor de background                          
   
    createScene();                                                   // criação da cena e dos objectos 
    createCamera();                                                   // criação das cameras 

    controls = new THREE.TrackballControls(trackballCamera);
    controls.addEventListener('change',render);
    
    render(); 

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);                      // chama a função onResize()
}

