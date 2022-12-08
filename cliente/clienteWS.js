function ClienteWS(){
    this.socket;
    this.codigo;
    
    this.conectar = function(){
        this.socket=io();
        this.servidorWS();
    }
    
    this.crearPartida = function(){
        this.socket.emit("crearPartida", rest.nick);
    }
    
    this.unirseAPartida = function(codigo){
        this.socket.emit("unirseAPartida", rest.nick, codigo);
    }
    
    this.abandonarPartida = function(){
        this.socket.emit("abandonarPartida",rest.nick,cws.codigo);
    }

    this.colocarBarco = function (nombre, x, y){
        this.socket.emit("colocarBarco",rest.nick,nombre,x,y)
    }
    this.barcosDesplegados = function(){
        this.socket.emit("barcosDesplegados",rest.nick)
    }
    this.disparar = function(x,y){
        console.log("pium?")
        this.socket.emit("disparar",rest.nick,x,y)
    }
    this.usuarioSale = function(nick, codigo){
        this.socket.emit("usuarioSale",rest.nick,codigo)
    }

    //Gestionar peticiones

    this.servidorWS = function(){
        let cli = this;

        this.socket.on("partidaCreada", function(data){
            console.log(data);
            if(data.codigo!=-1){
                console.log("Usuario " + rest.nick + " crea partida con codigo " + data.codigo)
                iu.mostrarAbandonarPartida();
                iu.mostrarCodigo(data.codigo);
                cli.codigo = data.codigo;
            }
            else{
                console.log("No se ha podido crear partida");
                iu.mostrarModal("No se ha podido crear la partida");
                iu.mostrarCrearPartida();
            }
        });

        this.socket.on("unidoAPartida", function(data){
            if(data.codigo!=-1){
                console.log("Usuario " + rest.nick + " se une a partida con codigo " + data.codigo);
                iu.mostrarAbandonarPartida();
                iu.mostrarCodigo(data.codigo);
                cli.codigo = data.codigo;
            }
            else{
                console.log("No se ha podido unir a partida");
            }
        });

        this.socket.on ("actualizarListaPartidas", function(lista){
            if(!cli.codigo){
                iu.mostrarListaDePartidasDisponibles(lista);
            }
        });

        this.socket.on("partidaAbandonada", function(data){
            if(data.codigo!=-1){
                iu.mostrarHome();
                iu.mostrarModal("Partida finalizada por abandono");
            }
            else{
                console.log("No se ha podido abandonar la partida")
                iu.mostrarModal("No se ha podido abandonar la partida")
            }
        });

        this.socket.on("aDesplegar", function(data){
            console.log(data)
            tablero.flota = data.flota;
            tablero.elementosGrid()
            tablero.mostrarFlota();
            iu.mostrarModal("Prepárate para la batalla");
        });

        this.socket.on("aJugar", function(){
            iu.mostrarModal("A jugar");
        });

        this.socket.on("barcoColocado",function(data){
            console.log(data.barco + " colocado")
            if (data.colocado.desplegado) {
                let barco = tablero.flota[data.barco];
                tablero.puedesColocarBarco(barco,data.x,data.y);
                iu.mostrarModal("El barco: "+ data.barco + " se ha colocado");
                cli.barcosDesplegados();
            }
            else {
                iu.mostrarModal("No se puede colocar barco")
            }
        });

        this.socket.on("disparo", function(data){
            console.log(data.atacante + " dispara en " + data.x + " " + data.y)
            if (data.atacante==rest.nick){
                console.log("kuxa que el atacante soy yo")
				tablero.updateCell(data.x,data.y,data.impacto,'computer-player');
			}
			else{
				tablero.updateCell(data.x,data.y,data.impacto,'human-player');	
			}
        });

        this.socket.on("usuarioHaSalido", function(data) {
            if(!(data.jugadorSale == rest.nick)){
                iu.mostrarModal("El usuario " + data.jugadorSale + " ha abandonado el sistema")
                iu.mostrarHome()
            }
            else {
                iu.mostrarModal("Te has salido a mitad de partida")
            }
        });

        this.socket.on("finalPartida", function(data) {
            iu.mostrarHome();
            iu.mostrarModal("Partida finalizada");
        });
    }
}