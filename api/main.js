//<![CDATA[


var browser = null;
var map = null;
var renderer = null;
var carModel = null;
let carPos = [15.3771059, 50.6752981, 12.5];
let carRot = [0,0,0];
let carScale = [1, 1, 1];
      
(function startDemo() {
    // create map in the html div with id 'map-div'
    // parameter 'map' sets path to the map which will be displayed
    // you can create your own map on melown.com
    // position parameter is described in documentation 
    // https://github.com/Melown/vts-browser-js/wiki/VTS-Browser-Map-API#position
    // view parameter is described in documentation 
    // https://github.com/Melown/vts-browser-js/wiki/VTS-Browser-Map-API#definition-of-view
    browser = vts.browser('map-div', {
        map: 'https://cdn.melown.com/mario/store/melown2015/map-config/melown/VTS-Tutorial-map/mapConfig.json',
        position : [ 'obj', 15.3775623,50.675077, 'float',0.00,-231.22,-25.55,0.00,101.83,55.00 ],
        minViewExtent: 50 //allow camera little bit closer
    });

    //check whether browser is supported
    if (!browser) {
        console.log('Your web browser does not support WebGL');
        return;
    }

    renderer = browser.renderer;

    //callback once is map config loaded
    browser.on('map-loaded', onMapLoaded);
})();


function onMapLoaded() {
    //add render slots
    //render slots are called during map render
    map = browser.map;    
    map.addRenderSlot('custom-models', onDrawModels, true);
    map.moveRenderSlotAfter('after-map-render', 'custom-models');

    //load models
    //ModelOBJ is the separate modelObj.js library
    carModel = new ModelOBJ(map, renderer, { path:'https://raw.githubusercontent.com/Melown/vts-browser-js/master/demos/meshes-obj-import/models/car-alpine/alpine.obj' }); 
}


function onDrawModels(renderChannel) {
    if (renderChannel != 'base') {
        return; //draw only in base channel
    }

    if (carModel && carModel.ready) { 
        carModel.draw({
            navCoords: carPos,
            heightMode: 'float',
            rotation: carRot,
            scale: carScale,
            ambientLight: [90,90,90]
        });
    }    
} 


document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
         carPos[1] -= 0.00001;
    }
    else if (e.keyCode == '40') {
        // down arrow
        carPos[1] += 0.00001;
    }
    else if (e.keyCode == '37') {
       // left arrow
        carPos[0] += 0.00001;
        carRot[0] += 10;
    }
    else if (e.keyCode == '39') {
       // right arrow
        carPos[0] -= 0.00001;
        carRot[0] -= 10;
    }

}


  //]]>
