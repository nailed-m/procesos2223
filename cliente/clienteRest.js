function ClienteRest(){
    this.nick;

    this.agregarUsuario=function(nick){
        let cli=this;
        $.getJSON("/agregarUsuario/"+nick,function(data){
            //se ejecuta cuando conteste el servidor
            console.log(data);
            if (data.nick!=-1){
                console.log("Usuario "+nick+" registrado")
                cli.nick=data.nick;
                //ws.nick=data.nick;
                $.cookie("nick",data.nick);
                iu.mostrarHome();
                //iu.mostrarCrearPartida();
            }
            else{
                console.log("No se ha podido registrar el usuario")
                iu.mostrarModal("El nick ya está en uso");
                iu.mostrarAgregarJugador();
            }
        });
    }

    this.crearPartida=function(){
        let cli=this;
        let nick = cli.nick;
        $.getJSON("/crearPartida/"+nick, function(data){
            //se ejecuta cuando conteste el servidor
            console.log(data);
            if (data.codigo!=-1){
                console.log("Usuario "+nick+" crea la partida "+data.codigo)
                iu.mostrarCodigo(data.codigo);
                //ws.nick=data.nick;
                //$.cookie("nick",ws.nick);
                //iu.mostrarHome(data);
            }
            else {
                console.log("No se ha podido crear la partida")
                //iu.mostrarModal("El nick ya está en unso");
                //iu.mostrarAgregarJugador();
            }
        });
    }

    this.unirseAPartida=function(codigo){
        let cli=this;
        $.getJSON("/unirseAPartida/"+cli.nick+"/"+codigo,function(data){
            //se ejecuta cuando conteste el servidor
            //console.log(data);
            if (data.codigo!=-1){
                console.log("Usuario "+cli.nick+" se une a la partida con codgido: "+data.codigo)
                iu.mostrarCodigo(data.codigo);
                //ws.nick=data.nick;
                //$.cookie("nick",ws.nick);
                //iu.mostrarHome(data);
            }
            else {
                console.log("No se ha podido unir a la partida")
                //iu.mostrarModal("El nick ya está en uso");
                //iu.mostrarAgregarJugador();
            }
        });
    }

    this.obtenerListaPartidas=function(){
        let cli=this;
        //obtenerPartidasDisponibles
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

    this.usuarioSale=function(){
        let nick=this.nick;
        $.getJSON("/salir/"+nick, function(){
            $.removeCookie("nick");
            iu.comprobarCookie();
        })
    }
}

