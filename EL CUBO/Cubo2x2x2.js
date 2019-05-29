controlGiro = 0;
multGiro = 1;
class Cubo2x2x2 extends THREE.Mesh {

	constructor(){
		super();

		this.createGUI();

		/* Crea materiales y colores
			- Está hecho así para poder cambiar entre colores y materiales rápido
		*/
		this.colores = [];
		this.setColors();
		this.coloresMateriales = [];
		this.setColoresMateriales();

		this.cubeDim = 4;

		this.cubePositions = [];

		this.getCubePositions();

		this.cubies = [];

		this.makeCubies();

		this.setCubies();
		
		for (let i = 0; i < 8; i++){
			this.add(this.cubies[i]);
		}
		
	}

	/*

	CARA FRONTAL : 		3	2			CARA TRASERA: 	7	6	
						1	0							5	4	
	*/

	getCubePositions(){
		// Cambio respecto la versión 3x3x3 las posiciones de los cubos restandole dim/2 a cada coordenada. Ayuda al posicionamiento en el centro
		let cont = 0;
		for(let z = 1; z >= 0; z--){
			for (let y = 0; y <= 1; y++){
				for (let x = 1; x >= 0; x--){
					this.cubePositions.push([(x * this.cubeDim) - this.cubeDim/2, (y * this.cubeDim) - this.cubeDim/2, (z * this.cubeDim) - this.cubeDim/2]);
					cont++;
				}
			}
		}

	}

	makeCubies(){
		let geometry = new THREE.BoxGeometry(this.cubeDim - 0.1, this.cubeDim - 0.1, this.cubeDim - 0.1);		
		
		// Se inicializa cada cubo con la geometria y colores correspondiente
		// CUBO 0
		this.cubies[0] = new THREE.Mesh(geometry, [this.coloresMateriales[0], this.coloresMateriales[6],
			this.coloresMateriales[6], this.coloresMateriales[3],this.coloresMateriales[4],this.coloresMateriales[6]]);
		// CUBO 1
		this.cubies[1] = new THREE.Mesh(geometry, [this.coloresMateriales[6], this.coloresMateriales[1],
			this.coloresMateriales[6], this.coloresMateriales[3],this.coloresMateriales[4],this.coloresMateriales[6]]);
		// CUBO 2
		this.cubies[2] = new THREE.Mesh(geometry, [this.coloresMateriales[0], this.coloresMateriales[6],
			this.coloresMateriales[2], this.coloresMateriales[6],this.coloresMateriales[4],this.coloresMateriales[6]]);
		// CUBO 3
		this.cubies[3] = new THREE.Mesh(geometry, [this.coloresMateriales[6], this.coloresMateriales[1],
			this.coloresMateriales[2], this.coloresMateriales[6],this.coloresMateriales[4],this.coloresMateriales[6]]);
		// CUBO 4
		this.cubies[4] = new THREE.Mesh(geometry, [this.coloresMateriales[0], this.coloresMateriales[6],
			this.coloresMateriales[6], this.coloresMateriales[3],this.coloresMateriales[6],this.coloresMateriales[5]]);
		// CUBO 5
		this.cubies[5] = new THREE.Mesh(geometry, [this.coloresMateriales[6], this.coloresMateriales[1],
			this.coloresMateriales[6], this.coloresMateriales[3],this.coloresMateriales[6],this.coloresMateriales[5]]);
		// CUBO 6
		this.cubies[6] = new THREE.Mesh(geometry, [this.coloresMateriales[0], this.coloresMateriales[6],
			this.coloresMateriales[2], this.coloresMateriales[6],this.coloresMateriales[6],this.coloresMateriales[5]]);
		// CUBO 7
		this.cubies[7] = new THREE.Mesh(geometry, [this.coloresMateriales[6], this.coloresMateriales[1],
			this.coloresMateriales[2], this.coloresMateriales[6],this.coloresMateriales[6],this.coloresMateriales[5]]);
	}

	setColors(){
		// ROJO
		this.colores[0] = 0xFF0000;
		// VERDE
		this.colores[1] = 0x00FF00;
		// AZUL
		this.colores[2] = 0x0000FF;
		// AMARILLO
		this.colores[3] = 0xFFFF00;
		// BLANCO
		this.colores[4] = 0xFFFFFF;
		// VIOLETA
		this.colores[5] = 0xFF00FF;
		// NEGRO
		this.colores[6] = 0x000000;
	}

	setColoresMateriales(){
		// Material ROJO
		this.coloresMateriales[0] = new THREE.MeshLambertMaterial({
			color: this.colores[0],
			flatShading: false,
		});

		// Material VERDE
		this.coloresMateriales[1] = new THREE.MeshLambertMaterial({
			color: this.colores[1],
			flatShading: false,
		});

		// Material AZUL
		this.coloresMateriales[2] = new THREE.MeshLambertMaterial({
			color: this.colores[2],
			flatShading: false,
		});

		// Material AMARILLO
		this.coloresMateriales[3] = new THREE.MeshLambertMaterial({
			color: this.colores[3],
			flatShading: false,
		});

		// Material BLANCO
		this.coloresMateriales[4] = new THREE.MeshLambertMaterial({
			color: this.colores[4],
			flatShading: false,
		});

		// Material VIOLETA
		this.coloresMateriales[5] = new THREE.MeshLambertMaterial({
			color: this.colores[5],
			flatShading: false,
		});

		// Material NEGRO
		this.coloresMateriales[6] = new THREE.MeshLambertMaterial({
			color: this.colores[6],
			flatShading: false,
		});

	}

	// Establece la posición de cada cubo con la matriz transformacion TRANSLATE
	setCubies(){
		for (let i = 0; i < this.cubies.length; i++){
			this.cubies[i].applyMatrix (new THREE.Matrix4().makeTranslation(this.cubePositions[i][0],
				this.cubePositions[i][1],this.cubePositions[i][2]));
		}
	}

	/*
	 Cambia las posiciones del vector cubePositions respecto a la rotación de la cara 
	 IMPORTANTÍSIMO: Hay que pasarle el vector de posiciones que rotan en sentido antihorario
	 EJEMPLO DE USO: 		let positions = [0,2,6,4];
							this.changePositions(positions);
						Rota los cubos 0,2,6,4 en sentido horario (pero se seleccionan en sentido antihorario )
	*/
	changePositions(positions){
		var aux = this.cubies[positions[0]];
		for(let i = 0; i < 3; i++){
			this.cubies[positions[i]] = this.cubies[positions[i+1]]; 
		}
		this.cubies[positions[3]] = aux; 

	}

	createGUI () {
		// Controles para el movimiento de la parte móvil
		this.guiControls = new function () {
			// Giros del cubo completo dependiendo del eje
			this.rotacionY = 0.0;
			this.rotacionZ = 0.0;

			// Giros de las distintas caras
			this.giroSeccionX1 = 0.0;
			this.giroSeccionX2 = 0.0;
			this.giroSeccionY1 = 0.0;
			this.giroSeccionY2 = 0.0;
			this.giroSeccionZ1 = 0.0;
			this.giroSeccionZ2 = 0.0;

		} 
		
		// Se crea una sección para los controles de la caja
		var folder = gui.addFolder ('Controles del cubo');
		// Hay que cambiar el Math.PI/4 por Math.PI/2 cuando se haga la rotación bien
		//folder.add (this.guiControls, 'rotacionY', 0.0, 2*Math.PI, Math.PI/4).name ('Rotación Y : ').listen();
		//folder.add (this.guiControls, 'rotacionZ', 0.0, 2*Math.PI, Math.PI/4).name ('Rotación Z : ').listen();

		// Controles para los giros de las caras
		folder.add (this.guiControls, 'giroSeccionX1', 0.0, Math.PI/2, Math.PI/2).name ('Giro Sec X1: ').listen();
		folder.add (this.guiControls, 'giroSeccionX2', 0.0, Math.PI/2, Math.PI/2).name ('Giro Sec X2: ').listen();
		folder.add (this.guiControls, 'giroSeccionY1', 0.0, Math.PI/2, Math.PI/2).name ('Giro Sec Y1: ').listen();
		folder.add (this.guiControls, 'giroSeccionY2', 0.0, Math.PI/2, Math.PI/2).name ('Giro Sec Y2: ').listen();
		folder.add (this.guiControls, 'giroSeccionZ1', 0.0, Math.PI/2, Math.PI/2).name ('Giro Sec Z1: ').listen();
		folder.add (this.guiControls, 'giroSeccionZ2', 0.0, Math.PI/2, Math.PI/2).name ('Giro Sec Z2: ').listen();


	}

	decideGiros(){
		// Decide qué hacer si se ha movido la palanquita de la sección X1
		if(this.guiControls.giroSeccionX1 > 0.0){
			// Se cambian las posiciones
			let positions = [0,2,6,4];
			this.changePositions(positions);

			//Crea la matriz que se va a usar para rotar los elementos
			var matrix = new THREE.Matrix4();
			//Rota la matriz
			matrix.makeRotationX(Math.PI / 2);

			// Se le pasa la matriz giro y las posiciones que rotan
			this.rotaCubos(matrix, positions);

			// Devuelve la palanquita a 0
			this.guiControls.giroSeccionX1 = 0.0;
		}

		//SECCION X2
		if(this.guiControls.giroSeccionX2 > 0.0){
			// Se cambian las posiciones
			let positions = [1,3,7,5];
			this.changePositions(positions);

			//Crea la matriz que se va a usar para rotar los elementos
			var matrix = new THREE.Matrix4();
			//Rota la matriz
			matrix.makeRotationX(Math.PI / 2);

			// Se le pasa la matriz giro y las posiciones que rotan
			this.rotaCubos(matrix, positions);

			// Devuelve la palanquita a 0
			this.guiControls.giroSeccionX2 = 0.0;
		}
		// Y1
		if(this.guiControls.giroSeccionY1 > 0.0){
			// Se cambian las posiciones
			let positions = [2,3,7,6];
			this.changePositions(positions);

			//Crea la matriz que se va a usar para rotar los elementos
			var matrix = new THREE.Matrix4();
			//Rota la matriz
			matrix.makeRotationY(Math.PI / 2);

			// Se le pasa la matriz giro y las posiciones que rotan
			this.rotaCubos(matrix, positions);

			// Devuelve la palanquita a 0
			this.guiControls.giroSeccionY1 = 0.0;
		}

		// Y2
		if(this.guiControls.giroSeccionY2 > 0.0){
			// Se cambian las posiciones
			let positions = [0,1,5,4];
			this.changePositions(positions);

			//Crea la matriz que se va a usar para rotar los elementos
			var matrix = new THREE.Matrix4();
			//Rota la matriz
			matrix.makeRotationY(Math.PI / 2);

			// Se le pasa la matriz giro y las posiciones que rotan
			this.rotaCubos(matrix, positions);

			// Devuelve la palanquita a 0
			this.guiControls.giroSeccionY2 = 0.0;
		}

		// Z1
		if(this.guiControls.giroSeccionZ1 > 0.0){
			// Se cambian las posiciones
			let positions = [0,1,3,2];
			this.changePositions(positions);

			//Crea la matriz que se va a usar para rotar los elementos
			var matrix = new THREE.Matrix4();
			//Rota la matriz
			matrix.makeRotationZ(Math.PI / 2);

			// Se le pasa la matriz giro y las posiciones que rotan
			this.rotaCubos(matrix, positions);

			// Devuelve la palanquita a 0
			this.guiControls.giroSeccionZ1 = 0.0;
		}

		// Decide qué hacer si se ha movido la palanquita de la sección 1
		if(this.guiControls.giroSeccionZ2 > 0.0){
			// Se cambian las posiciones
			let positions = [4,5,7,6];
			this.changePositions(positions);

			//Crea la matriz que se va a usar para rotar los elementos
			var matrix = new THREE.Matrix4();
			//Rota la matriz
			matrix.makeRotationZ(Math.PI / 2);

			// Se le pasa la matriz giro y las posiciones que rotan
			this.rotaCubos(matrix, positions);

			// Devuelve la palanquita a 0
			this.guiControls.giroSeccionZ2 = 0.0;
		}
	}

	rotaCubos(matrix, positions){
		this.cubies[positions[0]].applyMatrix(matrix);
		this.cubies[positions[1]].applyMatrix(matrix);
		this.cubies[positions[2]].applyMatrix(matrix);
		this.cubies[positions[3]].applyMatrix(matrix);
	}

	update(){
		// Esta función rota todo el objeto sobre todos los ejes
		//this.rotation.set (0.0, this.guiControls.rotacionY, this.guiControls.rotacionZ);

		this.decideGiros();

		/*
		// Esto es una animación básica para comprobar los giros
		if(controlGiro == 50){
			// Hay que almacenar las posiciones que van a rotar
			let positions = [0,1,5,4];
			this.changePositions(positions);

			//Create a matrix
			var matrix = new THREE.Matrix4();
			//Rota la matriz
			matrix.makeRotationY(Math.PI / 2);
			
			this.cubies[0].applyMatrix(matrix);
			this.cubies[1].applyMatrix(matrix);
			this.cubies[5].applyMatrix(matrix);
			this.cubies[4].applyMatrix(matrix);
			

		}

		
		if(controlGiro == 100){

			let positions = [0,2,6,4];
			this.changePositions(positions);

			//Create a matrix
			var matrix = new THREE.Matrix4();
			//Rotate the matrix
			matrix.makeRotationX(Math.PI / 2);

			this.cubies[0].applyMatrix(matrix);
			this.cubies[2].applyMatrix(matrix);
			this.cubies[6].applyMatrix(matrix);
			this.cubies[4].applyMatrix(matrix);
		}

		if(controlGiro > 101){
			controlGiro = 0;
		}

		controlGiro++;
		*/
	}

}