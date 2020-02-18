const http = require('http');
const url = require('url');
const fs = require('fs');
const PUERTO = 8080
//--Pregunta examen que devuelva otra peticion o añadir puertas traseras
//-- Configurar y lanzar el servidor. Por cada peticion recibida
//-- se imprime un mensaje en la consola
http.createServer((req, res) => {
  console.log("----------> Peticion recibida")
  let q = url.parse(req.url, true);
  console.log("Recurso:" + q.pathname)


  let filename = ""
  const mime = {
   'html' : 'text/html',
   'css'  : 'text/css',
   'jpg'  : 'image/jpg',
   'png'  : 'image/png',
   'ico'  : 'image/x-icon',
   'mp3'  :	'audio/mpeg3',
   'mp4'  : 'video/mp4'
  };
  //-- Obtener fichero a devolver
  if (q.pathname == "/") {
    filename += "index.html"
  } else {
    filename += q.pathname
  }
  var str = filename
    console.log(str);
  //-- Leer fichero
  fs.readFile(str, function(err, data) {
    console.log("data");
    //-- Tipo mime por defecto: html
    console.log(str.split(".")[1]);
    let mimeType =  mime[str.split(".")[1]];
    console.log(mimeType);
    //-- Fichero no encontrado. Devolver mensaje de error
    if (!err) {
      //-- Generar el mensaje de respuesta
      console.log("h");
      res.writeHead(200, {'Content-Type': mimeType});
    } else {
      res.writeHead(404, {'Content-Type': mimeType});
      return res.end("404 Not Found");
    }
    console.log();
    res.write(data);
    res.end();
  });

}).listen(PUERTO);

console.log("Servidor corriendo...")
console.log("Puerto: " + PUERTO)
