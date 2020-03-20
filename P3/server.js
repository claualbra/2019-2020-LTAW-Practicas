const http = require('http');
const url = require('url');
const fs = require('fs');
const PUERTO = 8080
let carrito = ''
//--Pregunta examen que devuelva otra peticion o añadir puertas traseras
//-- Configurar y lanzar el servidor. Por cada peticion recibida
//-- se imprime un mensaje en la consola
http.createServer((req, res) => {
  console.log("----------> Peticion recibida")
  let q = url.parse(req.url, true);
  console.log("Recurso:" + q.pathname)

  //-- Leer las cookies
  const cookie = req.headers.cookie;
  //--console.log("Cookie: " + cookie)

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
    filename += "/index.html"
  } else {
    filename += q.pathname
  }

  let str = filename.substr(1)

  if (str.split(".")[1]=="html" && str!="login.html") {
    //--comprobando si hay cookies
    if (!cookie) {
      str = "autentificacion.html"
    }
  }

  if (str.includes("carro")) {
    prod=str.split("_")[1]
    arrycookie = cookie.split(';')
    aux = arrycookie.findIndex((element) => element.includes('carrito='))
    if (aux == -1) {
      carrito = 'carrito=' + prod
    } else {
      carrito = arrycookie[aux] + '&' + prod
    }
    console.log(carrito);
    res.setHeader('Set-Cookie', carrito)
    str='carro.html'
  }

  //-- Leer fichero
  fs.readFile(str, function(err, data) {
    if (str=="login.html") {
      res.setHeader('Set-Cookie', 'user=claualbra')
    }
    //-- Tipo mime por defecto: html
    let mimeType =  mime[str.split(".")[1]];

    //-- Fichero no encontrado. Devolver mensaje de error
    if (err == null) {
      //-- Generar el mensaje de respuesta
      res.writeHead(200, {'Content-Type': mimeType});
    } else {
      res.writeHead(404, {'Content-Type': mimeType});
      return res.end("404 Not Found");
    }
    res.write(data);
    res.end();
  });

}).listen(PUERTO);

console.log("Servidor corriendo...")
console.log("Puerto: " + PUERTO)
