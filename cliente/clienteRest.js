function ClienteRest(){

    this.nick;

    this.agregarUsuario=function(nick){
        let cli=this;

        /*
        Esto es una función de JQuery, con ella se accede a una URI de la web para realizar una operación (en este caso, crear un usuario)
        La función pregunta al servidor a través de la URI. Esto en enuestra aplicación se traduce en:
            1.  El cliente REST llama a la API REST(/index.js) 
            2.  La API REST llama al servidor (/servidor/modelo.js)
        Cuando el servidor termina de hacer sus cosas (crear el usuario) devuelve una respuesta.
        Esa respuesta es la que nosotros pasamos como parámetro 'data' a la función

        Por tanto, esta función se ejecuta de manera asíncrona, pues tiene que esperar una respuesta externa mientras el resto del sistema puede seguir funcionando
        */
        $.getJSON("/agregarUsuario/"+nick,function(data){
            console.log(data);
            if (data.nick!=-1){
                console.log("Usuario "+nick+" registrado")
                cli.nick=data.nick;
                //ws.nick=data.nick;
                $.cookie("nick",data.nick);
                cws.conectar();
                iu.mostrarHome();
                //iu.mostrarCrearPartida();
            }
            else{
                console.log("No se ha podido registrar el usuario")
                iu.mostrarModal("El nick ya está en uso");
                iu.comprobarCookie();
            }
        });
        /*
        En este punto de la función agregarUsuario, si quisieramos implementar más cosas deberíamos hacerlas teniendo en cuenta que el servidor
        puede no haber contestado todavía y que llamar en ese caso a información que devuelve el servidor podría provocar errores si no gestionamos bien la sincronía
        - Una opción sería implementar esas cosas que necesitan la respuesta del servidor dentro de la función de callback (la función function(data) dentro del getJSON)
        */
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


//Lo de module.exports no se pone aqui al ser del cliente, ya que todo lo puesto aqui es global
//Los objetos del cliente(index.html,clienteRest,...) estan en el servidor y con la primera peticion de http el servidor los manda al cliente
//pero como los renderiza el cliente en el diagrama despliegue los ponemos en el navegador no en el servidor