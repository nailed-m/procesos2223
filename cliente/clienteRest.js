function ClienteRest(){
    this.nick;
    this.agregarUsuario=function(nick){
        var cli=this;
        $.getJSON("/agregarUsuario/"+nick,function(data){
            //se ejecuta cuando conteste el servidor
            console.log(data);
            if (data.nick!=-1){
                console.log("Usuario "+nick+" registrado")
                cli.nick=data.nick;
                //ws.nick=data.nick;
                //$.cookie("nick",ws.nick);
                iu.mostrarHome();
                iu.mostrarCrearPartida();
            }
            else{
                console-log("No se ha podido registrar el usuario")
                //iu.mostrarModal("El nick ya está en uso");
                //iu.mostrarAgregarJugador();
            }
        });
    }

    this.crearPartida=function(nick){
        let cli=this;
        $.getJSON("/crearPartida/"+nick, function(data){
            //se ejecuta cuando conteste el servidor
            console.log(data);
            if (data.codigo!=-1){
                console.log("Usuario "+cli.nick+" crea la partida "+data.codigo)
                iu.mostrarCodigo(data.codigo);
            }
            else {
                console.log("No se ha podido crear la partida")
            }
        })
    }

    this.unirseAPartida=function(codigo){
        let cli=this;
        $.getJSON("/unirseAPartida/"+cli.nick+"/"+codigo,function(data){
            //se ejecuta cuando conteste el servidor
            console.log(data);
            if (data.codigo!=-1){
                console.log("Usuario "+cli.nick+" se une a la partida "+data.codigo)
                iu.mostrarCodigo(data.codigo);
            }
            else {
                console.log("No se ha podido unir a la partida")
            }
        })
    }

    this.obtenerListaPartidas=function(){
        let cli=this;
        $.getJSON("/obtenerPartidas",function(lista){
            console.log(lista);
            iu.mostrarListaDePartidas(lista);
        });
    }

    this.obtenerListaPartidasDisponibles=function(){
        let cli=this;
        $.getJSON("/obtenerPartidasDisponibles",function(lista){
            console.log(lista);
            iu.mostrarListaDePartidasDisponibles(lista);
        });
    }
}

