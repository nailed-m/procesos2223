const fs=require("fs");
const express = require('express');
const app = express();

//HTTP GET POST PUT DELETE
/*
get "/"
get "/obtenerPartidas"
post get "/agregarUsuario/:nick"
put "/actualizarPartida"
delete "/eliminarPartida"
...
*/
app.get('/', (req,res) => {
    res
        .status(200)
        .send("Hola")
        .end();
});
//Start the server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("App listening on port ${PORT}");
    console.log("Press Ctrl+C to quit");
});