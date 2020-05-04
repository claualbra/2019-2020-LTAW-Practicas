//-- Cargar las dependencias
//-- Modulo express
const express = require('express')

//-- Crear una nueva aplciacion web
const app = express()

//-- Crear un servidor. Los mensajes recibidos
//-- los gestiona la app
const http = require('http').Server(app);

//-- Biblioteca socket.io en el lado del servidor
const io = require('socket.io')(http);

//-- Puerto donde lanzar el servidor
const PORT = 8080
var contador = 0;

function hoyFecha(){
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1;
    var yyyy = hoy.getFullYear();
    var h = hoy.getHours();
    var m = hoy.getMinutes();
    var s = hoy.getSeconds();
    return dd+'/'+mm+'/'+yyyy+' --> '+ h+':'+m+':'+s;
}
//-- Lanzar servidor
http.listen(PORT, function(){
  console.log('Servidor lanzado en puerto ' + PORT);
});

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Página principal
app.get('/', (req, res) => {
  let path = __dirname + '/chat.html';
  res.sendFile(path);
  console.log("Acceso a " + path);
});

//-- Otra vista de prueba
app.get('/woala', (req, res) => {
  res.send('WOALA! Chuck Norris approved!! :-)');
  console.log("Acceso a /woala");
});

//-- El resto de peticiones se interpretan como
//-- ficheros estáticos
app.use('/', express.static(__dirname +'/'));

//------ COMUNICACION POR WEBSOCKETS
//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){
  contador += 1;
  //-- Usuario conectado. Imprimir el identificador de su socket
  console.log('--> Usuario conectado!. Socket id: ' + socket.id);

  //-- Le damos la bienvenida a través del evento 'hello'
  //-- ESte evento lo hemos creado nosotros para nuestro chat
  socket.emit('hello', "Bienvenido al Chat");

  //-- Función de retrollamada de mensaje recibido del cliente
  socket.on('msg', (msg) => {
    console.log("Cliente: " + socket.id + ': ' + msg);

    //-- Enviar el mensaje a TODOS los clientes que estén conectados
    io.emit('msg', msg);
  })
  socket.on('cmd', (msg) => {
    socket.emit('cmd', msg);
    switch (msg) {
      case '/help':
        comand = 'Los comandos soportados son: <br> <ul>/help</ul>'+
                  '<ul>/list</ul><ul>/hello</ul><ul>/date</ul>';
        socket.emit('cmd', comand);
        break;
      case '/list':
        comand = 'Hay conectados ' + contador + ' usuarios';
        socket.emit('cmd', comand);
        break;
      case '/hello':
        comand = 'Hola, mi querido usuario!!! Disfruta del chat :))';
        socket.emit('cmd', comand);
        break;
      case '/date':
        comand = 'Fecha: ' + hoyFecha();
        socket.emit('cmd', comand);
        break;
      default:
        socket.emit('cmd', 'Comando incorrecto, pruebe: /help, /list, /hello o /date');
    }
  })
  //-- Usuario desconectado. Imprimir el identificador de su socket
  socket.on('disconnect', function(){
    contador -= 1;
    console.log('--> Usuario Desconectado. Socket id: ' + socket.id);
  });
});
