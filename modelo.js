function Juego(){
	this.partidas=[];
	this.usuarios={}; //array asociativo
	
	this.agregarUsuario=function(nick){
		if(!this.usuarios[nick]){
			this.usuarios[nick]=new Usuario(nick)
		}
	}
	this.eliminarUsuario=function(nick){
		delete this.usuarios[nick];
	}
	
	this.crearPartida=function(nick){
		let codigo=Date.now();
		this.partidas[codigo]=new Partida(codigo,nick);
		return codigo;
	}
}

function Usuario(nick, juego){
	this.nick=nick;
	this.juego=juego;
	this.crearPartida=function(){
		return this.juego.crearPartida(this.nick)
	}
	this.unirseAPartida=function(codigo){
		if(this.partidas[codigo]){
			this.partidas[codigo].agregarJugador(nick);
		}
		else{
			console.log("La partida no existe");
		}
	}
	this.obtenerPartidas=function(){
			let lista=[];
			for(var key in this.partidas){
				lista.push({"codigo":key,"owner":this.partidas[codigo].owner})
			}
	}
}

function Partida(codigo,nick){
	this.codigo=codigo;
	this.owner=nick;
	this.jugadores=[]; //array normal o asociativo
	this.fase="inicial";
	this.agregarJugador=function(nick){
		if(this.jugadores.length<2){
			this.jugadores.push(nick);
		}
	}
}