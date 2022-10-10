function ClienteRest(){
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
                iu.mostrarCrearPartida(data);
            }
            else{
                console-log("No se ha podido registrar el usuario")
                //iu.mostrarModal("El nick ya está en uso");
                //iu.mostrarAgregarJugador();
            }
        });
        //todavía no estoy seguro de que haya contestado el servidor
        //lo que pongas aquí se ejecuta a la vez que la llamada
    }

    this.crearPartida=function(nick){
        let cli=this;
        $.getJSON("/crearPartida/"+nick, function(data){
            //se ejecuta cuando conteste el servidor
            console.log(data);
            if (data.codigo!=-1){
                console.log("Usuario "+cli.nick+" crea la partida "+data.codigo)
            }
            else {
                console.log("No se ha podido crear la partida")
            }
        })
    }

    /*
        app.get("/unirseAPartida/:nick/:codigo",function(request,response){
          let nick = request.params.nick;
          let codigo = request.params.codigo;
          let res = juego.jugadorSeUneAPartida(nick,codigo);
          response.send(res);
        });

    */
    this.unirseAPartida=function(nick,codigo){
        let cli=this;
        $.getJSON("/unirseAPartida/"+nick+"/"+codigo,function(data){
            //se ejecuta cuando conteste el servidor
            console.log(data);
            if (data.codigo!=-1){
                console.log("Usuario "+cli.nick+" se une a la partida "+data.codigo)
            }
            else {
                console.log("No se ha podido unir a la partida")
            }
        })
    }
}

