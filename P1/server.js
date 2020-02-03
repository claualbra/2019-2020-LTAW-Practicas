//-- Puerto donde recibir las peticiones
const PUERTO = 8080;

//-- Modulo http, ayuda a gestionar peticiones y respuestas
const http = require('http');

console.log("Arrancando servidor...")

//-- Funcion para atender a una Peticion
//-- req: Mensaje de solicitud
//-- res: Mensaje de respuesta
//-- Configurar el servidor
http.createServer( (req, res) => {
  //-- Peticion recibida
  console.log("Peticion recibida!")

  //-- Crear mensaje de respuesta
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(PUERTO);

console.log("Servidor LISTO!")
console.log("Escuchando en puerto: " + PUERTO)
