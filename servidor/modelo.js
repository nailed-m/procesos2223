function Juego() {
	this.partidas = [];
	this.usuarios = {}; //array asociativo
	this.agregarUsuario = function (nick) {
		let res={nick:-1};
		if (!this.usuarios[nick]) {
			this.usuarios[nick] = new Usuario(nick);
			res={nick:nick};
		}
		return res;
	}
	this.eliminarUsuario = function (nick) {
		delete this.usuarios[nick];
	}
	this.crearPartida = function (nick) {
		let codigo = Date.now();
		console.log("Usuario "+usr.nick+" crea partida "+codigo);
		this.partidas[codigo] = new Partida(codigo, nick);
		return codigo;
	}
	this.unirseAPartida = function (codigo, usr) {
		if (this.partidas[codigo]) {
			this.partidas[codigo].agregarJugador(usr);
		}
		else {
			console.log("La partida no existe");
		}
	}

	this.jugadorCreaPartida = function(nick) {
		//Bro como escribe tan rapido no me da tiempo a nada
		let usr = this.usuarios[nick];
		let res = {codigo:-1};
		if (usr) {
			let codigo = usr.crearPartida();
			res = {codigo:codigo};
		}
		return res;
	}

	this.jugadorSeUneAPartida=function(nick, codigo){
		let usr = this.usuarios[nick];
		let res = {"codigo":-1};
		if (usr) {
			let valor = usr.unirseAPartida(codigo);
			res={"codigo":valor};
		}
		return res;
	}
	this.obtenerPartidas = function () {
		let lista = [];
		for (var key in this.partidas) {
			lista.push({ "codigo": key, "owner": this.partidas[codigo].owner })
		}
	}
}

function Usuario(nick, juego) {
	this.nick = nick;
	this.juego = juego;
	this.crearPartida = function () {
		return this.juego.crearPartida(this)
	}
	this.unirseAPartida = function (codigo) {
		this.juego.unirseAPartida(codigo, this);
	}
}

function Partida(codigo, nick) {
	this.codigo = codigo;
	this.owner = usr;
	this.jugadores = []; //array normal o asociativo
	this.fase = "inicial";
	this.agregarJugador = function (usr) {
		if (this.jugadores.length < 2) {
			this.jugadores.push(usr);
		}
		else {
			console.log("La partida está completa")
		}
	}
	this.agregarJugador(this.owner);
}

module.exports.Juego = Juego;