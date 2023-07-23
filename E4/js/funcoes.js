//trackballControls
var controls;

//flags
var flagArray = [];  //  

flagArray[0] = false;           // 0 - orbit, 1 - pause
flagArray[1] = false;           // wireframe
flagArray[9] = false;           // ball movement
flagArray[10] = true;           // directLight
flagArray[11] = false;          // calculo da luz
flagArray[12] = true;           // pointlight


function onResize() {
    'use strict';

    if (flagArray[0]) {
        console.log('oi');
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
        
        pauseCamera.left = - width/2;                                //reajustar parametros da camera de acordo
        pauseCamera.right = width/2;                                 //com o novo tamanho da janela
        pauseCamera.top = height/2;
        pauseCamera.bottom = - height/2;

        renderer.setSize(window.innerWidth, window.innerHeight);                                  //update das alterações da camera
        pauseCamera.updateProjectionMatrix();           //atualizar o tamanho da renderização (tamanho novo da janela)
        render();

    }

    else {
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (window.innerHeight > 0 && window.innerWidth > 0) {
            orbitCamera.aspect = window.innerWidth / window.innerHeight;
            orbitCamera.updateProjectionMatrix();
        }
    }
    
}


function onKeyDown(e) {
    'use strict';
    if (!flagArray[0]) {                         // ta no orbit
        switch (e.keyCode) {
        case 87: //W
        case 119: //w
            flagArray[1] = !flagArray[1];
            switchWireframe();                        // Wireframe
            break;
        case 66: //B
        case 98: //b
            flagArray[9] = !flagArray[9];                     // flag - ball movement
            break;
        case 68: //D
        case 100: //d
            flagArray[10] = !flagArray[10];                     // flag - directlight
            switchDirectLight();
            break;
        case 76: //L
        case 108: //l
            switchLightCalculation();                           // calculo da luz
            break;
        case 80: //P
        case 112: //p
            flagArray[12] = !flagArray[12];                     // flag - pointLight
            switchPointLight();
            break;
        }
    }

    else {
        switch (e.keyCode) {
        case 82: //R
        case 114: //r
            reset();
            break;
        }
    }

    switch (e.keyCode) {
    case 83: //S
    case 115: //s

        flagArray[0] = !flagArray[0];                     // flag - pause
        pause();
        break;
    }

}

function pause() {
    if (!flagArray[0]){                      // orbit clock start , animate restarts
        requestAnimationFrame(animate);
        clock.start();
    }

    else                                     // pausa clocks stop
        clock.stop();
    onResize();
}

function reset() {
    flagArray[0] = 0;                            // flag orbit
    requestAnimationFrame(animate);

    flagArray[9] = false;                          //ball movement
    ball.startPosition();

    if (flagArray[1]) {                            //wireframe on
        flagArray[1] = !flagArray[1];
        switchWireframe();
    }

    if (materialType == 2) 
        switchLightCalculation();

    if (!flagArray[10]) {                       //direct light off
        flagArray[10] = !flagArray[10];
        switchDirectLight();
    }

    if (!flagArray[12]) {                     //point light off
        flagArray[12] = !flagArray[12];
        switchPointLight();
    }

    orbitCamera.position.set(50,50,50);
}


function switchPointLight() {

    if (flagArray[12] == true) {
        pointLight.visible = true;
    }
    else { 
        pointLight.visible = false;
    }
}

function switchDirectLight() {
    if (flagArray[10] == true)
        directLight.visible = true;
    else 
        directLight.visible = false;
}

function switchWireframe() {
    board.changeWireframe();
    cube.changeWireframe();
    ball.changeWireframe();
}

function switchLightCalculation() {

	if (materialType == 1){                
    	board.basicMaterial();
        cube.basicMaterial();
        ball.basicMaterial();
    	materialType = 2;
    }

	else {
    	board.phongMaterial();
        cube.phongMaterial();
        ball.phongMaterial();
    	materialType = 1;
	}
}

function ballMovement(delta) {
    if (flagArray[9] == true)
        ball.movement(delta,1);
    else
        ball.movement(delta,-1);
}


function animate() {              
    'use strict';
    if (!flagArray[0]) 
        requestAnimationFrame(animate);
    
    controls.update();

    var delta = clock.getDelta();
    ballMovement(delta);
    render();
}