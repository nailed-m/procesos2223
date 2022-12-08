function Tablero(size) {
	this.size = size;
	this.nombreBarco;
	this.placingOnGrid = false;
	this.flota;

	this.mostrarTablero = function (si) {
        console.log("Entro a mostrar tablero")
		let x = document.getElementById("tablero");
		if (si) {
			x.style.display = "block";
		}
		else {
			x.style.display = "none";
		}
	}

	this.ini = function () {
		var humanCells = document.querySelector('.human-player').childNodes;
		for (var k = 0; k < humanCells.length; k++) {
			humanCells[k].self = this;
			humanCells[k].addEventListener('click', this.placementListener, false);
		}
		var computerCells = document.querySelector('.computer-player').childNodes;
		for (var j = 0; j < computerCells.length; j++) {
			computerCells[j].self = this;
			computerCells[j].addEventListener('click', this.shootListener, false);
		}
	}
	
	this.asignarFlotaListener = function () {
		var playerRoster = document.querySelector('.fleet-roster').querySelectorAll('li');
		for (var i = 0; i < playerRoster.length; i++) {
			playerRoster[i].self = this;
			playerRoster[i].addEventListener('click', this.rosterListener, false);
		}
	}
	this.placementListener = function (e) {
		self = e.target.self;
		if (self.placingOnGrid) {
			// Extract coordinates from event listener
			var x = parseInt(e.target.getAttribute('data-x'), 10);
			var y = parseInt(e.target.getAttribute('data-y'), 10);

			self.colocarBarco(x, y, self.nombreBarco);
		
		}
	};
	this.endPlacing = function (shipType) {
		document.getElementById(shipType).setAttribute('class', 'placed');
		self.placingOnGrid = false;
	}
	this.rosterListener = function (e) {
		var self = e.target.self;
		var cli = this;
		// Remove all classes of 'placing' from the fleet roster first
		var roster = document.querySelectorAll('.fleet-roster li');
		for (var i = 0; i < roster.length; i++) {
			var classes = roster[i].getAttribute('class') || '';
			classes = classes.replace('placing', '');
			roster[i].setAttribute('class', classes);
		}

		// Set the class of the target ship to 'placing'
		self.nombreBarco = e.target.getAttribute('id');
		document.getElementById(self.nombreBarco).setAttribute('class', 'placing');
		//Game.placeShipDirection = parseInt(document.getElementById('rotate-button').getAttribute('data-direction'), 10);
		self.placingOnGrid = true;
	};
	this.colocarBarco = function (x, y, nombre) {
		//comprobar límites
		console.log("Colocar barco: " + x + "-" + y + " " + nombre);
		cws.colocarBarco(nombre, x, y);
		//return true;
	}
	this.puedesColocarBarco = function (barco, x, y) {
		for (i = 0; i < barco.tam; i++) {
			console.log("x: " + (x + i) + " y:" + y);
			this.updateCell(x + i, y, "ship", 'human-player');
		}
		self.endPlacing(barco.nombre);
	}
	this.shootListener = function (e) {
		var x = parseInt(e.target.getAttribute('data-x'), 10);
		var y = parseInt(e.target.getAttribute('data-y'), 10);
		console.log("disparo x: " + x + " y: " + y);
		cws.disparar(x, y);
	}
	this.updateCell = function (x, y, type, target) {
		var player = target;//'human-player';

		var classes = ['grid-cell', 'grid-cell-' + x + '-' + y, 'grid-' + type];
		document.querySelector('.' + player + ' .grid-cell-' + x + '-' + y).setAttribute('class', classes.join(' '));
	};
	this.crearGrid = function () {
        console.log("Entro en crear grid")
		var gridDiv = document.querySelectorAll('.grid');

		for (var grid = 0; grid < gridDiv.length; grid++) {
			//gridDiv[grid].removeChild(gridDiv[grid].querySelector('.no-js')); // Removes the no-js warning
			let myNode = gridDiv[grid];
			while (myNode.lastElementChild) {
				myNode.removeChild(myNode.lastElementChild);
			}
            console.log(this.size)
			for (var i = 0; i < this.size; i++) {
				for (var j = 0; j < this.size; j++) {
					var el = document.createElement('div');
					el.setAttribute('data-x', j);
					el.setAttribute('data-y', i);
					el.setAttribute('class', 'grid-cell grid-cell-' + j + '-' + i);
					gridDiv[grid].appendChild(el);
				}
			}
		}
		this.ini();
	};
	this.elementosGrid = function () {
        console.log("Entro en elementos grid")
		$('#gc').remove();
		let cadena = '<div class="game-container" id="gc">';
		cadena = cadena + '<div id="roster-sidebar">';
		cadena = cadena + '<h4>Barcos</h4><div id="flota"></div></div>';
		cadena = cadena + '<div class="grid-container"><h2>Tu flota</h2>';
		cadena = cadena + '<div class="grid human-player"></div></div><div class="grid-container">';
		cadena = cadena + '<h2>Flota enemiga</h2><div class="grid computer-player"></div></div>'
		cadena = cadena + '<div></div></div>';
		$('#tablero').append(cadena);
		this.crearGrid();
	}

	this.mostrarFlota = function () {
		console.log("metodo mostrarFlota");
		console.log(this.flota);
		$("#listaF").remove();
		let cadena = '<ul class="fleet-roster" id="listaF">';
		for (let key in this.flota) {
			cadena = cadena + "<li id='" + key + "'>" + key + "</li>"
		}
		cadena = cadena + "</ul>";
		$('#flota').append(cadena);
		//<ul>
		//	cadena=cadena+'<li id="b2">b2</li>'
		//</ul>
		this.asignarFlotaListener();
	}
	//this.crearGrid();
	//this.mostrar(false);
}