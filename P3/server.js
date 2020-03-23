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
    if (cookie.includes("user=")) {
      var prod=str.split("_")[1]
      var arrycookie = cookie.split(';')
      var aux = arrycookie.findIndex((element) => element.includes('carrito='))
      if (aux == -1) {
        carrito = 'carrito=' + prod
      } else {
        carrito = arrycookie[aux] + '&' + prod
      }
      res.setHeader('Set-Cookie', carrito)
      str='carro.html'
    } else {
      str="autentificacion.html"
    }
  }

  function list_compra(content) {
    if (cookie.includes("carrito=")) {
      content += `</p>
                  <p>Productos comprados: </p>
                  <p>`
      var arrycookie = cookie.split(';')
      var aux = arrycookie.findIndex((element) => element.includes('carrito='))
      var arrayprod=arrycookie[aux].split('=')[1].split('&')
      var repetidos= []
      for (var i = 0; i < arrayprod.length; i++) {
        var num = 0
        for (var j = 0; j < arrayprod.length; j++) {
          if (arrayprod[i] == arrayprod[j]) {
            num += 1
          }
        }
        if (repetidos.indexOf(arrayprod[i]) == -1) {
          repetidos.push(arrayprod[i])
          content += '<li>'+ num + ' Disfraz de '+ decodeURIComponent(arrayprod[i]) + '</li>'
        }
      }
      content += '</p>'
    } else {
      content += '<p>No ha seleccionado ningún prducto vuelve a la página principal</p>'
    }

    return content
  }

  if (str=='respuesta.html') {
    if (req.method === 'POST') {
      // Handle post info...

      var content = `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="utf-8">
          <title>Pedido</title>
          <link rel="stylesheet" href="css/autentificacion.css">
          <link rel="icon" href="img/foto.ico">
        </head>
        <body>
          <div>
            <h1>Recibo de compra</h1>
            <p>Datos de compra: </p>
            <p>`

      req.on('data', chunk => {
          //-- Leer los datos (convertir el buffer a cadena)
          data = chunk.toString().split('&');

          //-- Añadir los datos a la respuesta
          for (var i = 0; i < data.length; i++) {
            content += decodeURIComponent(data[i].replace(/\+/gi,' ')) + '<br>'
          }

          content = list_compra(content)
          //-- Fin del mensaje. Enlace al formulario
          content += `
                <p>Comprueba que los datos son correctos, si no lo son vuelve al formulario:</p>
                <a href="/comprar.html">[Formulario]</a>
                <p>Para seguir comprando vuelve a la pagina principal: </p>
                <a href="index.html">[Pagina principal]</a>
              </div>
            </body>
          </html>
          `
          //-- Mostrar los datos en la consola del servidor
          console.log("Datos recibidos: " + data)
          res.statusCode = 200;
       });

       req.on('end', ()=> {
         //-- Generar el mensaje de respuesta
         res.setHeader('Content-Type', 'text/html')
         res.write(content);
         res.end();
       })
       return
    }
  }

  //-- Leer fichero
  fs.readFile(str, function(err, data) {
    if (str == "login.html") {
      res.setHeader('Set-Cookie', 'user=claualbra')
    }else if (str=='comprar.html') {
      data = list_compra(data)
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
