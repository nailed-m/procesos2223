const fs=require("fs");
const express = require('express');
const exp = require("constants");
const app = express();
const modelo = require("./servidor/modelo.js");
const { request } = require("http");

const PORT = process.env.PORT || 3000;

//HTTP GET POST PUT DELETE
/*
get "/"
get "/obtenerPartidas"
post get "/agregarUsuario/:nick"
put "/actualizarPartida"
delete "/eliminarPartida"
...
*/

/*
app.get('/', (req,res) => {
    res
        .status(200)
        .send("Hola")
        .end();
});
*/

app.use(express.static(__dirname + "/"));

app.get("/", function(request,response){
	var contenido=fs.readFileSync(__dirname+"/cliente/index.html");
	response.setHeader("Content-type","text/html");
	response.send(contenido);
});

app.get("/agregarUsuario/:nick", function(request, response) {
    let nick = request.params.nick;
    let res;
    res = juego.agregarUsuario(nick);
    response.send(res);
});

app.get("/crearPartida/:nick", function(request, response) {
    let nick = request.params.nick;
    let usr = juego.usuarios[nick];
    
    let res = {codigo:-1};
    if(usr){
        codigo = usr.crearPartida();
        res={codigo:codigo};
    }
    return res;
});

app.get("/unirseAPartida/:nick", function(request, response) {
    let nick = request.params.nick;
    let codigo = request.params.codigo;
    let res = juego. //no se como seguia
    let usr = juego.usuarios[nick];
    
    let res = {codigo:-1};
    if(usr){
        codigo = usr.unirseAPartida();
    }
    return res;
});


//Start the server

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log("Press Ctrl+C to quit");
});