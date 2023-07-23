var camera, scene, renderer;
var geometry, wireframe, mesh;
var material, grid;

var plane, spotlights;
var directLight, lightId;
var clock;

//camera
var aspect = window.innerWidth / window.innerHeight;        // rácio entre largura e altura 
var viewSize = 160;                                          // "zoom" da camera (-> quanto maior, mais longe)
var width = viewSize * aspect;                              // resolução horizontal -> número de quadriculas por linha
var height = viewSize;                                      // resolução vertical -> número de linhas
                                          // numero de bolas

//movement

var materialArray = [];

function createScene() {                                                     //cria objetos e adiciona à cena
    'use strict';
    scene = new THREE.Scene();                                                               //criação cena
    scene.add(new THREE.AxisHelper(10));                                                     //adicionar axis

    plane = new Plane(0,0,0);
    scene.add(plane);

    spotlights = new Spotlight(2,5,33,1,27);
    scene.add(spotlights);

    directLight = new DirectLight(0xffffff, 1);
    scene.add(directLight);
}

function createCamera() {
    'use strict';
    flagArray[0] = 1;

    camera = new THREE.PerspectiveCamera(50, aspect, 1, 1000);
    camera.position.set(50,50,50);

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
    window.addEventListener('keyup', onKeyUp);
}

