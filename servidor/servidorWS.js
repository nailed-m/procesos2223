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
				if(partida.esDesplegando()){
					let usr = juego.obtenerUsuario(nick);
                    let flota = usr.obtenerFlota();
					let res = {}
					res.flota = flota
					console.log(res);
                    cli.enviarATodosEnPartida(io, codigoStr, "aDesplegar", res);
				}
			  	if(partida.esJugando()){
			  		cli.enviarATodosEnPartida(io,codigoStr,"aJugar",{});
			  	}
			});
			socket.on("abandonarPartida",function(nick,codigo){
				let usr = juego.obtenerUsuario(nick);
				let partida = juego.obtenerPartida(codigo)

				let codigoStr = codigo.toString();
				if(usr && partida){
					let rival = partida.obtenerRival(usr.nick);
					if(rival==undefined){
						let res = {"codigo":codigo,"usr":usr.nick}
						partida.abandonarPartida(usr);
						cli.enviarATodosEnPartida(io,codigoStr,"partidaAbandonada",res);
						socket.leave(codigoStr);
					}
					else {
						let res = {"codigo":codigo,"usr":usr.nick,"rival":rival.nick}
						partida.abandonarPartida(usr);
						cli.enviarATodosEnPartida(io,codigoStr,"partidaAbandonada",res);
						socket.leave(codigoStr);
					}
					
				}
			});
			socket.on("colocarBarco", function(nick,nombre,x,y){
				let usr = juego.obtenerUsuario(nick);
				if(usr){
					let barcoColocado = usr.colocarBarco(nombre,x,y)
					let res = {"barco":nombre, "x":x, "y":y, "colocado":barcoColocado}
					cli.enviarAlRemitente(socket,"barcoColocado",res);
				}
			});
			socket.on("barcosDesplegados",function(nick){
				let usr = juego.obtenerUsuario(nick);
				if(usr){
					let partida = usr.partida;
					let res = usr.barcosDesplegados()
					let codigoStr = partida.codigo.toString();
					if(partida.esJugando()){
						cli.enviarATodosEnPartida(io,codigoStr,"aJugar",{});
					}
				}
			});
			socket.on("disparar", function(nick,x,y){
				let usr = juego.obtenerUsuario(nick);
                let res = { jugador: nick, disparoX: x, disparoY: y }
				let partida = usr.partida;
				let turno = partida.obtenerTurno();
				if (usr == turno) {
					let impacto=usr.disparar(x, y)

					let codigoStr = partida.codigo.toString();
					console.log("hola caracola")
					if (partida.esFinal()) {
						cli.enviarATodosEnPartida(io, partida.codigo.toString(), "finalPartida", usr.nick);
					}
					
					let res2 = { atacante: usr.nick, impacto: impacto, x: x, y: y, turno: turno.nick }
					cli.enviarATodosEnPartida(io, codigoStr, "disparo", res2);
				}
				else{ 
					cli.enviarAlRemitente(socket, "noEsTuTurno", res);
				}
			});
			socket.on("usuarioSale",function(nick,codigo){
                let lista = juego.obtenerPartidasDisponibles();
              
                res= {jugadorSale:nick} 
                //console.log(nick)
                //console.log(codigo)
                if(codigo){
                    let codigoStr =codigo.toString();              
                    cli.enviarATodosEnPartida(io, codigoStr, "usuarioHaSalido", res);
                    cli.enviarATodos(socket, "actualizarListaPartidas", lista); 
                }

            });
        });
    }
}

module.exports.ServidorWS=ServidorWS;