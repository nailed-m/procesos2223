function ControlWeb() {
    this.mostrarAgregarUsuario = function () {
        var cadena = '<div class="row" id="mAU">';//'<form class="form-row needs-validation"  id="mAJ">';
        cadena = cadena + '<div class="row"><h2>El juego indefinido</h2></div>';
        cadena = cadena + '<div class="row">';
        cadena = cadena + '<div class="col">'
        cadena = cadena + '<input type="text" class="form-control mb-2 mr-sm-2" id="usr" placeholder="Introduce tu nick (max 6 letras)" required></div>';
        cadena = cadena + '<div class="col">';
        cadena = cadena + '<button id="btnAU" class="btn btn-primary mb-2 mr-sm-2">Iniciar sesión</button>';
        //cadena=cadena+'<a href="/auth/google" class="btn btn-primary mb-2 mr-sm-2">Accede con Google</a>';
        cadena = cadena + '</div>'; //' </form>';
        cadena = cadena + '<div id="nota"></div></div></div>';

        $("#agregarUsuario").append(cadena);
        //$("#nota").append("<div id='aviso' style='text-align:right'>Inicia sesión con Google para jugar</div>");    

        $("#btnAU").on("click", function (e) {
            if ($('#usr').val() === '' || $('#usr').val().length > 6) {
                e.preventDefault();
                $('#nota').append('Nick inválido');
            }
            else {
                var nick = $('#usr').val();
                $("#mAU").remove();
                $("#aviso").remove();
                rest.agregarUsuario(nick);
            }
        })
    }

    this.mostrarHome = function () {
        let bienvenida = '<div id="mH"><p>Bienvenido '+rest.nick+'</p></div>';
        $("#mostrarHome").append(bienvenida);
    }

    this.mostrarCrearPArtida=function(){
        //Dibujar un botón que al hacer click llame a partida de rest
    }

    this.mostrarListaDePartidas=function(){
        //hacer un list que muestre las partidas creadas
    }

}