let modelo=require("./modelo.js");

describe("El juego...", function() {
  var miJuego;
  var us1,us2,partida;

  beforeEach(function() {   //Se ejecuta antes de cada bloque it
    miJuego=new modelo.Juego();
    miJuego.agregarUsuario("pepe");
    miJuego.agregarUsuario("luis");
    let res=miJuego.jugadorCreaPartida("pepe");
    miJuego.jugadorSeUneAPartida("luis",res.codigo);
    us1=miJuego.obtenerUsuario("pepe");
    us2=miJuego.obtenerUsuario("luis");
    partida=miJuego.obtenerPartida(res.codigo);
  });

  it("inicialmente", function(){
    expect(us1.nick).toEqual("pepe");
    expect(us2.nick).toEqual("luis");

    //comprobar que los usuarios están en la partida
    //comprobar que cada usuario tiene 2 tableros de 5x5
    //que contienen agua (esAgua())
    //comprobar que cada usuario tiene 1 flota de 2 barcos
    //de tamaño 4 y 2
    //comprobar que la partida esta en fase jugando
  });

  it("luis y pepe están en la partida",function(){
    expect(partida.estoy("pepe")).toEqual(true);
    expect(partida.estoy("luis")).toEqual(true);
  });

  it("los dos jugadores tienen tablero propio y rival",function(){
    expect(us1.tableroPropio).toBeDefined();
    expect(us2.tableroPropio).toBeDefined();
    expect(us1.tableroRival).toBeDefined();
    expect(us2.tableroRival).toBeDefined();

    expect(us1.tableroPropio.casillas.length).toEqual(5);
    expect(us2.tableroPropio.casillas.length).toEqual(5);

    //habría que recorrer las 5 columnas
    for(x=0;x<5;x++){
      expect(us1.tableroPropio.casillas[x].length).toEqual(5);
    }
  //  expect(us2.tableroPropio.casillas[0].length).toEqual(5);
    
    //habría que recorrer todo el tablero
    for(x=0;x<us1.tableroPropio.casillas.length;x++){
      for(y=0;y<us1.tableroPropio.casillas[x].length;y++){
        expect(us1.tableroPropio.casillas[x][y].contiene.nombre).toEqual("agua");
      }
    }
  });

  it("los dos jugadores tienen flota (2 barcos, tam 2 y 4)",function(){
    expect(us1.flota).toBeDefined();
    expect(us2.flota).toBeDefined();
    
    //expect(us1.flota.length).toEqual(2);  //da fallo porq es un array asociativo
    expect(Object.keys(us1.flota).length).toEqual(2); //seria asi
    expect(Object.keys(us2.flota).length).toEqual(2);
    
    //expect(us1.flota[0].tam).toEqual(2); //aqui igual
    expect(us1.flota["b2"].tam).toEqual(2);
    expect(us1.flota["b4"].tam).toEqual(4);
  });

  it("la partida está en fase desplegando",function(){
    expect(partida.esJugando()).toEqual(false);
    expect(partida.esDesplegando()).toEqual(true); //Este metodo no lo tenemos
  })

  describe("A jugar!",function(){
    beforeEach(function(){ //Como esta anidado, el beforeEach de arriba tambien se hace
      us1.colocarBarco("b2",0,0); // 0,0 1,0
	    us1.colocarBarco("b4",0,1); // 0,1 1,1 2,1 3,1
	    us1.barcosDesplegados();
	    us2.colocarBarco("b2",0,0);
	    us2.colocarBarco("b4",0,1);
	    us2.barcosDesplegados();    
    });

    it("Comprobar que las flotas estan desplegadas",function(){ //metodos todosDesplegados...
      expect(us1.todosDesplegados()).toEqual(true);
      expect(us2.todosDesplegados()).toEqual(true);

    });

    it("Comprobar jugada que Pepe gana",function(){
      expect(us2.flota["b2"].obtenerEstado()).toEqual("intacto");
      expect(us2.flota["b4"].obtenerEstado()).toEqual("intacto");
      us1.disparar(0,0);
      expect(us2.flota["b2"].obtenerEstado()).toEqual("tocado");
	    us1.disparar(1,0);
      expect(us2.flota["b2"].obtenerEstado()).toEqual("hundido");
      expect(us2.flota["b4"].obtenerEstado()).toEqual("intacto");
	    us1.disparar(0,1);
      expect(us2.flota["b4"].obtenerEstado()).toEqual("tocado");
	    us1.disparar(1,1);
	    us1.disparar(2,1);
	    us1.disparar(3,1);
      expect(us2.flota["b4"].obtenerEstado()).toEqual("hundido");
      expect(us2.flotaHundida()).toEqual(true);
      expect(us1.flotaHundida()).toEqual(false);



    });

    it("Comprobar el cambio de turno",function(){
      expect(partida.turno).toEqual(us1);
      us1.disparar(2,2);
      expect(partida.turno).toEqual(us2);


    });

    it("Comprobar que no deja disparar si no es tu turno",function(){
      expect(partida.turno).toEqual(us1);
      expect(us1.flota["b2"].obtenerEstado()).toEqual("intacto");
      us2.disparar(0,0);
      expect(us1.flota["b2"].obtenerEstado()).toEqual("intacto");

    });

  });

});
