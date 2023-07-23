//trackballControls
var trackballCamera;
var controls;

//flags
var flagArray = [];  // 0-camera 1,2,3 ; 1- trackball ; 2-up,3-down,4-left,5-right; 6-lastPressedFlag , 7-direcao , 8 - wireframe , 9 - ballAxis

flagArray[1] = false;
flagArray[7] = 1;
var delta = 0;

function onResize() {
    'use strict';

    if (flagArray[0] < 2) {

        if (window.innerWidth >= window.innerHeight) {           //quando a largura é maior ou igual que a altura 
            aspect = window.innerWidth / window.innerHeight;    
            width = viewSize * aspect;                           //ajusta a largura de acordo com o ratio
            height = viewSize;
        }

        else if (window.innerWidth < window.innerHeight) {        //quando a largura é menor que a altura  
            //console.log("aqui");
            aspect = window.innerHeight / window.innerWidth;
            width = viewSize;
            height = viewSize * aspect;                           //ajusta a altura de acordo com o ratio
        }

        camera.left = - width / 2;                                //reajustar parametros da camera de acordo
        camera.right = width / 2;                                 //com o novo tamanho da janela
        camera.top = height / 2;
        camera.bottom = - height / 2;

        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.updateProjectionMatrix();

    }

    else {
        renderer.setSize(window.innerWidth, window.innerHeight);

        if (window.innerHeight > 0 && window.innerWidth > 0) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        }
    }
}


function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
    case 65: //A
    case 97: //a
        flagArray[8] = 1;                     // flag - wireframe
        break;
    case 69: //E
    case 101://e
        flagArray[9] = 1;                     // flag - ball axis
        break;
    case 49: //1
        flagArray[0] = 1;                     // flag - camera
        break;
    case 50: //2
        flagArray[0] = 2;                     // flag - camera
        break;
    case 51: //3
        flagArray[0] = 3;                     // flag - camera         
        break;
    case 99: //c
    case 67: //C
        flagArray[1] = !flagArray[1];         // flag - trackBall
        break;
    }
}

function switchWireframe() {
    if (flagArray[8]  == 1) {
        for (let i = 0; i < 3; i++) {
            materialArray[i].wireframe = !materialArray[i].wireframe;
        }
        flagArray[8] = 0;
    }
}

function switchBallAxis() {

    if (flagArray[9]  == 1) {
        balls.switchAxis();
        flagArray[9] = 0;
    }
}

function switchCamera(){
    if (flagArray[0] < 2) {
        camera = camera_1;
    }
    else if (flagArray[0] == 2) {
        camera = camera_2;
    }
    else {
        camera = camera_3;
    }
    camera.lookAt(scene.position);
    onResize();
}

function switchTrackball() {
    if (flagArray[1]) {
         scene.activeCamera = trackballCamera;
    }
}

function animate() {              
    'use strict';
    requestAnimationFrame(animate); 
    controls.update();                      // trackball
    switchWireframe();
    switchBallAxis();
    switchCamera();
    switchTrackball();
    delta += clock.getDelta();           // devolve número de segundos do clock tempo desde a ultima vez que foi chamado
    if(delta > 60){
        balls.updateSpeedArray();
        delta = 0;
    }

    balls.movement();
    balls.findCollisons();
  
    render(); 
}