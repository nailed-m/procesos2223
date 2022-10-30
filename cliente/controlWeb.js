function ControlWeb() {
    this.mostrarAgregarUsuario = function () {
        let cadena = "<div class='row' id='mAU'>";//'<form class="form-row needs-validation"  id="mAJ">';
        cadena = cadena + "<div class='col'>";
        cadena = cadena + "<div class='row'><div class='col'><h2>El juego indefinido</h2></div></div>";
        cadena = cadena + "<div class='row'>";
        cadena = cadena + "<div class='col'>";
        cadena = cadena + "<input type='text' class='form-control mb-2 mr-sm-2' id='usr' placeholder='Introduce tu nick (max 6 letras)' required></div>";
        cadena = cadena + "<div class='col'>";
        cadena = cadena + "<button id='btnAU' class='btn btn-primary mb-2 mr-sm-2'>Iniciar sesión</button>";
        //cadena=cadena+'<a href="/auth/google" class="btn btn-primary mb-2 mr-sm-2">Accede con Google</a>';
        cadena = cadena + "</div>"; //' </form>';
        cadena = cadena + "<div id='nota'></div></div></div>";

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
        $("#mH").remove();
        let bienvenida = "<div class='row' id='mH'>";
        bienvenida = bienvenida + "<div class='col'>";
        bienvenida = bienvenida + "<p>Bienvenido "+rest.nick+"</p>"
        bienvenida = bienvenida + "</div></div>";
        $("#mostrarHome").append(bienvenida);
        rest.obtenerListaPartidasDisponibles();
    }

    this.mostrarCrearPartida=function(){
        $("#mCP").remove();
        //Dibujar un botón que al hacer click llame a partida de rest
        let botonCP = "<div class='row' id='mCP'>"
        botonCP = "<div class='col'>";
        botonCP = botonCP + "<button id='buttonCP' class='btn btn-primary mb-2 mr-sm-2'>Crear partida</button>"
        botonCP = botonCP + "</div></div>";
         
        $("#mostrarCrearPartida").append(botonCP);

        $("#buttonCP").on("click", function (e) {
            $("#mCP").remove();
            $("#mLP").remove();
            rest.crearPartida(rest.nick);
        });
    }

    this.mostrarCodigo=function(codigo){
        let cadena = "<div class='row'>Código de la partida: " + codigo + "</div>";
        $("#codigo").append(cadena);
    }

    this.mostrarListaDePartidas=function(lista){
        $("#mLP").remove();
        let cadena = "<div id='mLP'>";
        cadena = cadena + "<ul class='list-group'>";
        for(i=0;i<this.lista.length;i++){
            cadena = cadena + "<li class'list-group-item'>"+lista[i].codigo+" propietario "+lista[i].owner+"</li>";
        }
        cadena = cadena + "</ul></div>";
        $("#mostrarListaDePartidas").append(cadena);
    }

    this.mostrarListaDePartidasDisponibles=function(lista){
        $("#mLP").remove();
        let cadena = "<div class='row' id='mLP'>";
        cadena = cadena + "<div class='col'>";
        cadena = cadena + "<h2>Lista de partidas disponibles</h2>";
        cadena = cadena + "<button id='buttonALPD' class='btn btn-primary mb-2 mr-sm-2'>Actualizar</button>"
        cadena = cadena + "<div class='row'>"
        cadena = cadena + "<ul class='list-group'>";
        for(i=0;i<lista.length;i++){
            cadena = cadena + "<li class='list-group-item'><a href='#' value='"+lista[i].codigo+"'>Nick propietario: "+lista[i].owner+"</a></li>";
        }
        cadena = cadena + "</ul></div></div></div>";
        $("#mostrarListaDePartidas").append(cadena);

        $("#buttonALPD").on("click", function (e) {
            $("#mLP").remove();
            rest.obtenerListaPartidasDisponibles();
            $("#mostrarListaDePartidas").append(cadena);
        });

        $(".list-group a").click(function(){
	        codigo=$(this).attr("value");
   	        console.log(codigo);
	        if (codigo){
	            $("#mLP").remove();
	            $("#mCP").remove();
	            rest.unirseAPartida(codigo);
	        }
	    });		
    }

}