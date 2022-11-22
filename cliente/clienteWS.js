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
        this.socket.emit("disparar",rest.nick,x,y)
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

        this.socket.on("partidaAbandonada", function(){
            if(data.codigo!=-1){
                iu.mostrarHome();
                iu.mostrarModal("Partida finalizada por abandono");
            }
            else{
                console.log("No se ha podido abandonar la partida")
                iu.mostrarModal("No se ha podido abandonar la partida")
            }
        });

        this.socket.on("aJugar", function(){
            iu.mostrarModal("A jugar");
        });

        this.socket.on("barcoColocado",function(data){
            iu.mostrarModal(data.barco + " colocado")
        });

        this.socket.on("disparo", function(data){
            iu.mostrarModal(data.jugaror + " dispara en " + data.disparoX + " " + data.disparoY)
        });
    }
}