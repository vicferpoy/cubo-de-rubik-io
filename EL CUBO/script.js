
/// La escena que tendrá todo lo que se tiene en cuenta al hacer un render
//  Lo que no esté incluido en la escena no será procesado por el renderer
scene = null;

/// La variable que referenciará al renderer
renderer = null;

/// El objeto que referencia a la interfaz gráfica de usuario
gui = null;

// La última posición del mouse
var lastMPos = {};
// Controlar si se está arrastrando el click
var isDragging = false;
var originalRotation = {
	x : 0,
	y : 0,
  z : 0
};

// Esta serie de variables controlan el giro
/**
 * heDecidido: indica si se ha decidido en qué eje va a ser la rotación
 * girandoX/girandoY: indica que se está rotando ese eje
 * decidiendoRotacion: Contador que en los I siguientes frames va a acumular las variación de posicion x,y del ratón
 * contadorX/contadorY: la acumulación de decidiendoRotacion
 * posInicialGiro: posicion del raton en el momento que se presionó
 */
var heDecidido = false;
var girandoY = false;
var girandoX = false;
var decidiendoRotacion = 0;
var contadorX = 0.0;
var contadorY = 0.0;
var posInicialGiro = {
  x: 0.0,
  y: 0.0
};

/// Se crea y configura un renderer WebGL
/**
 * El renderer recorrerá el grafo de escena para procesarlo y crear la imagen resultante. 
 * Debe hacer este trabajo para cada frame.
 * Si se cambia el grafo de escena después de visualizar un frame, los cambios se verán en el siguiente frame.
 * 
 * @return El renderer
 */
function createRenderer () {
  var renderer = new THREE.WebGLRenderer();
  // Se establece un color de fondo en las imágenes que genera el render
  renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
  
  // Se establece el tamaño, se aprovoche la totalidad de la ventana del navegador
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  return renderer;  
}

/// Función que se encarga de renderizar un frame
/**
 * Se renderiza la escena, captada por una cámara.
 */
function render() {
  // Se solicita que La próxima vez que haya que refrescar la ventana se ejecute una determinada función, en este caso la funcion render.
  // La propia función render es la que indica que quiere ejecutarse la proxima vez
  // Por tanto, esta instrucción es la que hace posible que la función  render  se ejecute continuamente y por tanto podamos crear imágenes que tengan en cuenta los cambios que se la hayan hecho a la escena después de un render.
  requestAnimationFrame(render);
  
  // Se le pide a la escena que se actualice antes de ser renderizada
  scene.update();
  
  // Por último, se le pide al renderer que renderice la escena que capta una determinada cámara, que nos la proporciona la propia escena.
  renderer.render(scene, scene.getCamera());
}

/// Función que actualiza la razón de aspecto de la cámara y el tamaño de la imagen que genera el renderer en función del tamaño que tenga la ventana
function onWindowResize () {
  scene.setCameraAspect (window.innerWidth / window.innerHeight);
  renderer.setSize (window.innerWidth, window.innerHeight);
}

// Función que rota el objeto en función del ratón
function mouseMove(event){
  if (isDragging){
	  if (typeof(lastMPos.x) != 'undefined'){
	      var deltaX = lastMPos.x - event.clientX,
          deltaY = lastMPos.y - event.clientY;

        // Este primer condicional va a comprobar la variacion de X e Y en un lapso de tiempo pequeño
        if(decidiendoRotacion < 6){
          contadorX += deltaX;
          contadorY += deltaY;
          decidiendoRotacion++;
        }else{
          // Este condicional es el que va a activar los flags necesarios para el giro además de decidir qué eje va a rotar en función de lo que el usuario mueva
          if(((Math.abs(contadorX)>(Math.abs(contadorY))) && !heDecidido)){
            heDecidido = true;
            girandoY = true;
            girandoX = false;
          }
          if(((Math.abs(contadorX)<(Math.abs(contadorY))) && !heDecidido)){
            heDecidido = true;
            girandoX = true;
            girandoY = false;
          }
        }

        if(girandoY){
          scene.cubo.rotation.y -= deltaX * 0.005;
        }
        if(girandoX){
          scene.cubo.rotation.x -= deltaY * 0.01;
        }
	  }
	  lastMPos = {
	    x : event.clientX,
	    y : event.clientY
	  };
  }

  /*
  // Esto es solo para mostrar las coordenadas X e Y del ratón. Para las pruebas 
  document.getElementById("posX").innerHTML =  posInicialGiro.x;
  document.getElementById("posY").innerHTML =  posInicialGiro.y;
  */
}

function mouseDown(event){
  if (event.which == 3){
  	isDragging = true;
  	lastMPos = {
  	    x : event.clientX,
  	    y : event.clientY
    };
    posInicialGiro = lastMPos;
  }
  else if (event.which == 1){
  	scene.cubo.mouseUpFalse();
  }
}

function mouseUp(event){
  if (event.which == 3){
    isDragging = false;
    
  	scene.cubo.rotation.x = originalRotation.x;
  	scene.cubo.rotation.y = originalRotation.y;
    scene.cubo.rotation.z = originalRotation.z;
    

    // Primero se decide la rotación, de cuantos grados va a ser
    let final = 0.0;
    // Hay que llamar a la función update y mouseUpTrue para que entre a la función decidirGiro esas 3 veces
    if(girandoY)
    {
      final = posInicialGiro.x - event.clientX;
      if (final > 250){
        scene.cubo.guiControls.giroSeccionY1  = 90;
        scene.cubo.update();
        scene.cubo.mouseUpTrue();
        scene.cubo.guiControls.giroSeccionY2  = 90;
        scene.cubo.update();
        scene.cubo.mouseUpTrue();
        scene.cubo.guiControls.giroSeccionY3  = 90;
        scene.cubo.update();
        scene.cubo.mouseUpTrue();
      }
      if (final < -250){
        scene.cubo.guiControls.giroSeccionY1  = -90;
        scene.cubo.update();
        scene.cubo.mouseUpTrue();
        scene.cubo.guiControls.giroSeccionY2  = -90;
        scene.cubo.update();
        scene.cubo.mouseUpTrue();
        scene.cubo.guiControls.giroSeccionY3  = -90;
        scene.cubo.update();
        scene.cubo.mouseUpTrue();
      }
    }
    if(girandoX)
    {
      final = posInicialGiro.y - event.clientY;
      if (final > 160){
        scene.cubo.guiControls.giroSeccionX1  = 90;
        scene.cubo.update();
        scene.cubo.mouseUpTrue();
        scene.cubo.guiControls.giroSeccionX2  = 90;
        scene.cubo.update();
        scene.cubo.mouseUpTrue();
        scene.cubo.guiControls.giroSeccionX3  = 90;
        scene.cubo.update();
        scene.cubo.mouseUpTrue();
      }
      if (final < -160){
        scene.cubo.guiControls.giroSeccionX1  = -90;
        scene.cubo.update();
        scene.cubo.mouseUpTrue();
        scene.cubo.guiControls.giroSeccionX2  = -90;
        scene.cubo.update();
        scene.cubo.mouseUpTrue();
        scene.cubo.guiControls.giroSeccionX3  = -90;
        scene.cubo.update();
        scene.cubo.mouseUpTrue();
      }
    }

    // Luego, se reinician los valores que ayudan a manejar la rotación
    heDecidido = false;
    girandoX = false;
    girandoY = false;
    contadorX = 0.0;
    contadorY = 0.0;
    decidiendoRotacion = 0.0;
  }
  else if (event.which == 1){
  		scene.cubo.mouseUpTrue();
  }
}

/// La función principal
$(function () {
  // Se crea el renderer
  renderer = createRenderer();
  
  // La salida del renderer se muestra en un DIV de la página index.html
  $("#WebGL-output").append(renderer.domElement);
  
  // listeners
  // Cada vez que el usuario cambie el tamaño de la ventana se llama a la función que actualiza la cámara y el renderer
  window.addEventListener ("resize", onWindowResize);
  document.addEventListener('mousemove', mouseMove, false);
  document.addEventListener('pointerup', mouseUp, false);
  document.addEventListener('pointerdown', mouseDown, false);
  
  // Se crea una interfaz gráfica de usuario vacia
  gui = new dat.GUI();
  
  // Se crea la escena. La escena es una instancia de nuestra propia clase encargada de crear y gestionar todos los elementos que intervienen en la escena.
  scene = new MyScene (renderer.domElement);

  // Finalmente, realizamos el primer renderizado.
  render();
});
