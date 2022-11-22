function ServidorWS(){
    //enviar peticiones
        this.enviarAlRemitente = function(socket, mensaje, datos){
            socket.emit(mensaje,datos);
        }

        this.enviarATodosEnPartida=function(io,codigo,mensaje,datos){
            io.sockets.in(codigo).emit(mensaje,datos);
        }

        this.enviarATodos=function(socket,mens,datos){
    		socket.broadcast.emit(mens,datos);
        }

    //gestionar peticiones
    this.lanzarServidorWS=function(io,juego){
        let cli = this;

        io.on('connection', (socket) => {
            console.log('Usuario conectado');

            socket.on("crearPartida",function(nick){		  	
			  	let res = juego.jugadorCreaPartida(nick);		  	
			  	let codigoStr=res.codigo.toString();
			  	socket.join(codigoStr);
	  			//cli.enviarAlRemitente(socket,"partidaCreada",res);
	  			cli.enviarATodosEnPartida(io,codigoStr,"partidaCreada",res)
	  			let lista=juego.obtenerPartidasDisponibles();
	  			cli.enviarATodos(socket,"actualizarListaPartidas",lista);
			});
			socket.on("unirseAPartida",function(nick,codigo){
				//console.log(codigo);
				let codigoStr=codigo.toString();
			  	socket.join(codigoStr);
			  	let res = juego.jugadorSeUneAPartida(nick,codigo);		  	
			  	cli.enviarAlRemitente(socket,"unidoAPartida",res);		  	
			  	let partida=juego.obtenerPartida(codigo);
			  	if (partida.esJugando()){
			  		cli.enviarATodosEnPartida(io,codigoStr,"aJugar",{});
			  	}

			});
			socket.on("abandonarPartida",function(nick,codigo){
				let usr = juego.obtenerUsuario(nick);
				let partida = juego.obtenerPartida(codigo)

				let codigoStr = codigo.toString();
				if(usr && partida){
					let rival = partida.obtenerRival(jugador.nick);
					let res = {codigoP:codigo,nombreA:jugador.nick,nombreG:rival.nick}
					partida.abandonarPartida(usr);
					cli.enviarATodosEnPartida(io,codigoStr,"partidaAbandonada",res);
					socket.leave(codigoStr);
				}
			});
			socket.on("colocarBarco", function(nick,nombre,x,y){
				let jugador = juego.obtenerUsuario(nick);
				if(jugador){
					jugador.colocarBarco(nombre,x,y)
					let desplegado = jugador.obtenerBarcoDesplegado(nombre)
					let res = {barco:nombre,colocado:desplegado}
					cli.enviarAlRemitente(socket,"barcoColocado",res);
				}
			});
			socket.on("barcosDesplegados",function(nick){
				let jugador = juego.obtenerUsuario(nick);
				if(jugador){
					let partida = jugador.partida;
					jugador.disparar(x,y)
					let codigoStr = partida.codigo.toString();
					let res = {jugador:nick,disparoX:x,disparoY:y}
					cli.enviarATodosEnPartida(io,codigoStr,"disparo",res);
				}
			});
        });
    }
}

module.exports.ServidorWS=ServidorWS;