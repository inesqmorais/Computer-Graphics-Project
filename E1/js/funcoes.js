//trackballControls
var trackballCamera;
var controls;

//flags
var flagArray = [];  // 0-camera 1,2,3 ; 1- trackball ; 2-up,3-down,4-left,5-right; 6-lastPressedFlag , 7-direcao , 8 - wireframe

flagArray[1] = false;
flagArray[7] = 1;


function onResize() {
    'use strict';
    if (window.innerWidth >= window.innerHeight) {           //quando a largura é maior ou igual que a altura 
        aspect = window.innerWidth / window.innerHeight;    
        width = viewSize * aspect;                           //ajusta a largura de acordo com o ratio
        height = viewSize;
        
    }

    else if (window.innerWidth < window.innerHeight) {        //quando a largura é menor que a altura  
        aspect = window.innerHeight / window.innerWidth;
        width = viewSize;
        height = viewSize * aspect;                           //ajusta a altura de acordo com o ratio
    }

    camera.left = - width / 2;                                //reajustar parametros da camera de acordo
    camera.right = width / 2;                                 //com o novo tamanho da janela
    camera.top = height / 2;
    camera.bottom = - height / 2;
    camera.updateProjectionMatrix();                          //update das alterações da camera

    renderer.setSize(window.innerWidth, window.innerHeight);  //atualizar o tamanho da renderização (tamanho novo da janela)
}



function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
    case 65: //A
    case 97: //a
        flagArray[8] = 1;                     // flag - wireframe
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
    case 37: //left
        flagArray[4] = 1;                     // flag - left
        break;
    case 38: //up
        flagArray[2] = 1;                     // flag - up
        flagArray[7] = -1;                    // flag - direction 
        break;
    case 39: //right
        flagArray[5] = 1;                     // flag - right
        break;
    case 40: //down
        flagArray[3] = 1;                     // flag - down
        flagArray[7] = 1;                     // flag - direction
        break;
    }
}


function onKeyUp(e) {
    switch (e.keyCode) {
        case 38: 
            flagArray[2] = 0;
            flagArray[6] = 1;               // flag - lastPressedFlag: 1(lastPressedFlag = up)
            break;
        case 40: 
            flagArray[3] = 0;
            flagArray[6] = 2;               // flag - lastPressedFlag: 2(lastPressedFlag = down)
            break;
        case 37:
            flagArray[4] = 0;
            break;
        case 39:
            flagArray[5] = 0;
            break;
    }
}


function switchWireframe() {
    if (flagArray[8] == 1) {
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
        flagArray[8] = 0;
    }
}

function switchCamera(){
    if (flagArray[0] < 2) {
        camera = camera_1;
    }
    else if (flagArray[0]==2) {
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
    switchCamera();
    switchTrackball();
    var delta = clock.getDelta();           // devolve número de segundos do clock
    chair.movement(delta);
  
    render(); 
}