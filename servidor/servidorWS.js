function ServidorWS(){
    //enviar peticiones
        //Implementar una función que responda mensajes solo a la persona que envió dichos mensajes a través de un socket, gomez la ha llamado this.enviarAlRemitente = function(socket, mensaje, datos)
        //Implementar una función que responda mensajes a todos los usuarios, sea el remitente o no, sgomez la ha llamado this.enviarATodosEnPartida = function (io, codigo, mensaje, datos)

    //gestionar peticiones
    this.lanzarServidorWS=function(io,juego){
        let cli = this;

        io.on('connection', (socket) => {
            console.log('Usuario conectado');

            //Implementar qué pasa cuando recibe una petición para crear partida

            //Implementar qué pasa cuando recibe una petición de unirseAPartida
        });
    }
}

module.exports.ServidorWS=ServidorWS;