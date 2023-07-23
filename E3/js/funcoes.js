//trackballControls
var trackballCamera;
var controls;

//flags
var flagArray = [];  // 0-spotlight 1,2,3,4 ; 1- trackball ; 2-up,3-down,4-left,5-right; 6-lastPressedFlag , 7-direcao , 8 - wireframe , 9 - sombreamento e fong, 10-calculo iluminacao, 11 - modo noite dia
var previouseType, materialType = 2 //1 - basic material ; 2 - lambertMaterial ; 3 - PhongMaterial 

flagArray[1] = false;


function onResize() {
    'use strict';
    
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }  
}


function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {

    case 49: //1
        flagArray[0] = 2;                     // flag - spotlight
        break;
    case 50: //2
        flagArray[0] = 3;                     // flag - spotlight
        break;
    case 51: //3
        flagArray[0] = 4;                     // flag - spotlight         
        break;
    case 52: //4
        flagArray[0] = 5;                     // flag - spotlight         
        break;

    case 65: //A
    case 97: //a
        flagArray[8] = 1;                     // flag - wireframe
        break;
    case 99: //c
    case 67: //C
        flagArray[1] = !flagArray[1];         // flag - trackBall
        break;
    case 103: //g
    case 71: //G
        flagArray[9] = 1;
        break;
    case 108: //l
    case 76: //L
        flagArray[10] = 1;
        break;
    case 110: //n
    case 78: //N
        flagArray[11] = 1;
        break;
    case 37: //left
        flagArray[4] = 1;                     // flag - left
        break;
    case 38: //up
        flagArray[2] = 1;                     // flag - up
        flagArray[7] = 1;                    // flag - direction 
        break;
    case 39: //right
        flagArray[5] = 1;                     // flag - right
        break;
    case 40: //down
        flagArray[3] = 1;                     // flag - down
        flagArray[7] = -1;                     // flag - direction
        break;
    }

}

function onKeyUp(e) {
    'use strict';
    switch (e.keyCode) {
        case 38: 
            flagArray[2] = 0;
            flagArray[6] = 1;               // flag - lastPressedFlag
            break;
        case 40: 
            flagArray[3] = 0;
            flagArray[6] = 2;               // flag - lastPressedFlag
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
    if (flagArray[8]  == 1) {
        plane.changeWireframe();
        spotlights.changeWireframe();
        flagArray[8] = 0;
    }
}

function switchTrackball() {
    if (flagArray[1]) {
         scene.activeCamera = trackballCamera;
    }
}

function switchSpotlight(){
    if (flagArray[0] != 1)
    	spotlights.spotSwitch(flagArray[0] - 2);

    flagArray[0] = 1;
}

function changeShadowAndPhong() {
	if (flagArray[9]) {
        if (materialType == 2) {
            spotlights.phongMaterial();
			plane.phongMaterial();
			materialType = 3;
		}

		else if (materialType == 3) {
            spotlights.lambertMaterial();
			plane.lambertMaterial();
			materialType = 2;
		}

		flagArray[9] = 0;
    }
}

function changeLightning() {
	if (flagArray[10]) {
        if (materialType != 1) {
            previouseType = materialType;
            spotlights.basicMaterial();
            plane.basicMaterial();
            materialType = 1;
        }

        else {
            if (previouseType == 2) {
                spotlights.lambertMaterial();
                plane.lambertMaterial();
            }
            else {
                spotlights.phongMaterial();
                plane.phongMaterial();
            }
            materialType = previouseType;
        }

        flagArray[10] = 0;
    }
}

function changeDayMode() {
	if (flagArray[11]) {
        directLight.switch();
		flagArray[11] = 0;
    }	
}

function animate() {              
    'use strict';
    requestAnimationFrame(animate); 
    controls.update();                      // trackball
    switchWireframe();
    switchTrackball();
    switchSpotlight();
    changeShadowAndPhong();
    changeLightning();
    changeDayMode();
    var delta = clock.getDelta();           // devolve número de segundos do clock
    plane.movement(delta);
    render(); 
}