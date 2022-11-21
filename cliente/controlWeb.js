/**
 * ControlWeb()
 * Función encargada de gestionar las vistas de la aplicación
 */
function ControlWeb() {

    //Revisa si en el navegador existe alguna cookie almacenada para dar o no la opción de ingresar con un nick
    this.comprobarCookie=function(){
        if ($.cookie("nick")){
            rest.nick=$.cookie("nick");
            cws.conectar();
            this.mostrarHome();
        }
        else{
            this.mostrarAgregarUsuario();
        }
    }

    this.mostrarAgregarUsuario = function () {
        let cadena = "<div class='row' id='mAU'>";//'<form class="form-row needs-validation"  id="mAJ">';
        cadena = cadena + "<div class='col'>";
        cadena = cadena + "<div class='row'><div class='col'><h2>Hundir la flota</h2></div></div>";
        cadena = cadena + "<div class='row'>";
        cadena = cadena + "<div class='col'>";
        cadena = cadena + "<input type='text' class='form-control mb-2 mr-sm-2' id='usr' placeholder='Introduce tu nick (max 6 letras)' required></div>";
        cadena = cadena + "<div class='col'>";
        cadena = cadena + "<button id='btnAU' class='btn btn-primary mb-2 mr-sm-2'>Iniciar sesión</button>";
        //cadena=cadena+'<a href="/auth/google" class="btn btn-primary mb-2 mr-sm-2">Accede con Google</a>';
        cadena = cadena + "</div>"; //' </form>';
        cadena = cadena + "<div id='nota'></div>"
        cadena = cadena + "</div></div></div>";

        $("#agregarUsuario").append(cadena);
        //$("#nota").append("<div id='aviso' style='text-align:right'>Inicia sesión con Google para jugar</div>");    

        $("#btnAU").on("click", function (e) {
            if ($('#usr').val() === '' || $('#usr').val().length > 6) { //El nick no puede ser un campo vacío ni tener más de 6 caracteres
                e.preventDefault();
                $('#nota').append('Nick inválido');
            }
            else {
                var nick = $('#usr').val();
                $("#mAU").remove();
                //$("#aviso").remove();
                rest.agregarUsuario(nick);
                //mostrar gif
            }
        })
    }

    this.mostrarHome = function () {

        $("#mH").remove();

        let cadena = "<div class='row' id='mH'>";
        cadena = cadena + "<div class='col'>";
        cadena = cadena + "<h2>Hundir la flota</h2>"
        cadena = cadena + "<div><p>Bienvenido "+rest.nick+"</p></div>";
        cadena = cadena + "<div id='codigo'></div>";
        cadena = cadena + "<div id='abandonarPartida'></div>"
        cadena = cadena + "<button id='btnSalir' class='btn btn-primary mb-2 mr-sm-2'>Salir</button>";
        cadena = cadena + "</div></div>";

        $("#agregarUsuario").append(cadena);
        this.mostrarCrearPartida();
        rest.obtenerListaPartidasDisponibles();
        
        $("#btnSalir").on("click",function(e){
            $("#mCP").remove();
            $("#mLP").remove();
            $("#mH").remove();
            rest.usuarioSale();
        });
    }

    this.mostrarCrearPartida=function(){

        $("#mCP").remove();

        //Dibujar un botón que al hacer click llame a partida de rest
        let cadena = "<div class='row' id='mCP'>"
        cadena = cadena + "<div class='col'>";
        cadena = cadena + "<button id='buttonCP' class='btn btn-primary mb-2 mr-sm-2'>Crear partida</button>"
        cadena = cadena + "</div></div>";
        
        $("#mostrarCrearPartida").append(cadena);

        $("#buttonCP").on("click", function (e) {
            $("#mCP").remove();
            $("#mLP").remove();
            //rest.crearPartida(); //Esto debemos sustituirlo por una función a través de WS (justo es la siguiente línea)
            cws.crearPartida();
        });
    }

    this.mostrarCodigo=function(codigo){
        let cadena = "Código de la partida: " + codigo;
        $("#codigo").append(cadena);
    }

    this.mostrarAbandonarPartida = function(){
        $("#mAP").remove();

        let cadena = "<div class='row' id='mAP'>"
        cadena = cadena + "<div class='col'>";
        cadena = cadena + "<button id='buttonAP' class='btn btn-primary mb-2 mr-sm-2'>Abandonar partida</button>"
        cadena = cadena + "</div></div>"

        $("#abandonarPartida").append(cadena)

        $("#buttonAP").on("click",function(e){
            cws.abandonarPartida();
        });
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
        //cadena = cadena + "<button id='buttonALPD' class='btn btn-primary mb-2 mr-sm-2'>Actualizar</button>"
        cadena = cadena + "<ul class='list-group'>";
        for(i=0;i<lista.length;i++){
            cadena = cadena + "<li class='list-group-item'><a href='#' value='"+lista[i].codigo+"'>Nick propietario: "+lista[i].owner+"</a></li>";
        }
        cadena = cadena + "</ul>"
        cadena = cadena + "</div>"
        cadena = cadena + "</div>";
        $("#mostrarListaDePartidas").append(cadena);

        $("#buttonALPD").on("click", function (e) {
            rest.obtenerListaPartidasDisponibles();
        });

        $(".list-group a").click(function(){
	        codigo=$(this).attr("value");
   	        console.log(codigo);
	        if (codigo){
	            $("#mLP").remove();
	            $("#mCP").remove();
	            //rest.unirseAPartida(codigo); //Esto debemos sustituirlo por una función a través de WS (justo la línea de abajo)
                cws.unirseAPartida(codigo);
	        }
	    });		
    }

    this.mostrarModal=function(msg){
        $("#mM").remove();
        var cadena = "<p id='mM'>"+msg+"</p>";
        $("#contenidoModal").append(cadena);
        $("#miModal").modal("show");
    }

}