function Juego(){
	this.partidas=[];
	this.agregarPartida=function(nombre){
		this.partidas.push(new Partida(nombre))
	}
	this.eliminarPartida=function(nombre){
		//TODO
	}
}

function Partida(nombre){
	this.nombre=nombre;
}