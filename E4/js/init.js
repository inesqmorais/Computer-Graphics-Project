var pauseScene, scene, renderer;
var geometry, wireframe, mesh;
var grid;

var orbitCamera, pauseCamera;
var pauseScene;
var directLight,pointLight;

var board,cube,ball,pivot,pauseScreen;
var clock;

var rot;

var materialType = 1;      //phongMaterial

//camera
var aspect = window.innerWidth / window.innerHeight;        // rácio entre largura e altura 
var viewSize = 90;                                          // "zoom" da camera (-> quanto maior, mais longe)
var width = viewSize * aspect;                              // resolução horizontal -> número de quadriculas por linha
var height = viewSize;                                      // resolução vertical -> número de linhas

var materialArray = [];

function createScene() {                                               //cria objetos e adiciona à cena
    'use strict';
    scene = new THREE.Scene();                                              //criação cena
    scene.add(new THREE.AxisHelper(10));                                    //adicionar axis

    board = new checkerBoard(0,0,0,25,0.5,25,10,10,10);
    scene.add(board);
    
    cube = new rubixCube(0,0,0,3,3,3,5,5,5);
    cube.position.y = 1.75;
    scene.add(cube);

    ball = new pollBall(0,0,0,2,32);
    ball.position.set(0,0.5,-6);
    scene.add(ball);

    ball.rotateY(Math.PI/2);

    pivot = new THREE.Object3D();
    cube.add(pivot);
    pivot.add(ball);

    //rot = ball.rotation.x;

    directLight = new THREE.DirectionalLight(0xffffff,1);                                   //DirectionalLight( color : Integer, intensity : Float )
    directLight.position.set(1,1,1);
    scene.add(directLight);

    pointLight = new THREE.PointLight( 0xffffff, 4, 16);                                     //PointLight( color : Integer, intensity : Float, distance : Number, decay : Float )
    pointLight.position.set( 0, 12, 0 );
    scene.add( pointLight );
}

function createPauseScene() {
    pauseScene = new THREE.Scene();

    var geometry = new THREE.BoxGeometry( 10,50 , 100);
    var material = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('textures/pause.png')});
    
    pauseScreen = new THREE.Mesh(geometry,material);
    pauseScreen.rotateY(-Math.PI/2);
    
    pauseScene.add(pauseScreen);
}

function createCamera() {
    'use strict';

    orbitCamera = new THREE.PerspectiveCamera(20, aspect, 1, 1000);               //PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
    orbitCamera.position.set(50,50,50);
    orbitCamera.lookAt(scene.position);

    pauseCamera = new THREE.OrthographicCamera(width/-2, width/2, height/2, height/-2, -30, 30);   //OrthographicCamera( left : Number, right : Number, top : Number, bottom : Number, near : Number, far : Number )
    //pauseCamera.position.set(0,1,-10)
    console.log("by")
    pauseCamera.lookAt(pauseScene.position);
}

function render() {
    'use strict';     
    if (flagArray[0])                        
        renderer.render(pauseScene, pauseCamera);
    else
        renderer.render(scene, orbitCamera);  
}

function init() { 
    'use strict';

    clock = new THREE.Clock(); //default its true
    clock.start();

    renderer = new THREE.WebGLRenderer({antialias: true});           // criação renderer
    renderer.setSize(window.innerWidth, window.innerHeight);         // tamanho a que queremos renderizar (tamanho da janela)
    document.body.appendChild(renderer.domElement);                  // adicionar renderer ao HTML 
    //renderer.setClearColor( 0xeae1c5,1);                           // mudar cor de background                          
   
    createScene();                                                   // criação da cena e dos objectos 
    createPauseScene();
    createCamera();                                                   // criação das cameras 

    controls = new THREE.OrbitControls(orbitCamera,renderer.domElement);
    controls.addEventListener('change',render);
    //controls.autoRotate = true;
    
    render(); 

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}

