//--Añadimos los modulos necesarios y el puerto donde se va a escuchar
const http = require('http');
const url = require('url');
const fs = require('fs');
const PUERTO = 8080

//-- Configurar y lanzar el servidor. Por cada peticion recibida
//-- se imprime un mensaje en la consola
http.createServer((req, res) => {
  console.log("----------> Peticion recibida")
  let q = url.parse(req.url, true);
  console.log("Recurso:" + q.pathname)

  let filename = ""
  //--tipos mime que nos podemos encontrar
  const mime = {
   'html' : 'text/html',
   'css'  : 'text/css',
   'jpg'  : 'image/jpg',
   'png'  : 'image/png',
   'ico'  : 'image/x-icon',
   'mp3'  :	'audio/mpeg3',
   'mp4'  : 'video/mp4'
  };
  //-- Obtener la ruta del fichero
  if (q.pathname == "/") {
    filename += "/index.html"
  } else {
    filename += q.pathname
  }

  //--nos quedamos con el fichero a devolver
  let str = filename.substr(1)
  //-- Leer fichero
  fs.readFile(str, function(err, data) {
    //-- Tipo mime
    let mimeType =  mime[str.split(".")[1]];
    //-- Comprobación de errores
    if (err == null) {
      //-- Generar el mensaje de respuesta
      res.writeHead(200, {'Content-Type': mimeType});
    } else {
      //--En el caso de fichero no encontrado, mensaje de error
      res.writeHead(404, {'Content-Type': mimeType});
      return res.end("404 Not Found");
    }
    //--Se envia los datos del fichero que se pide
    res.write(data);
    res.end();
  });

}).listen(PUERTO);

console.log("Servidor corriendo...")
console.log("Puerto: " + PUERTO)
