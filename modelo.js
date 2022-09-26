function Juego(){
	this.partidas=[];
	this.usuarios={}; //array asociativo
	
	this.agregarUsuario=function(nick){
		if(!this.usuarios[nick]){
			this.usuarios[nick]=new Usuario(nick)
		}
	}
	
	this.crearPartida=function(nick){
		//TODO
		//obtener código único
		//crear la partida con propietario nick
		//devolver el código
	}
}

function Partida(){
	this.codigo
}

function Usuario(nick, juego){
	this.nick=nick;
	this.juego=juego;
	this.crearPartida=function(){
		this.juego.crearPartida(nick)
	}
}