//-- Traza de prueba
console.log("Hola!")

//-- Obtener el párrafo del DOM donde mostrar el resultado
const sugerencias = document.getElementById('sugerencias');

//-- Cuando el usuario introduce el texto ve las sugerencias
function productos(str) {

  //-- Crear objeto para hacer peticiones AJAX
  const m = new XMLHttpRequest();

  //-- Configurar la petición
  m.open("GET","http://localhost:8080/myquery?p="+str, true);

  //-- Cuando la haya alguna noticia sobre la peticion
  //-- ejecuta este código
  m.onreadystatechange=function(){
     //-- Petición enviada y recibida. Todo OK!
     if (m.readyState==4 && m.status==200){
       //-- La respuesta es un objeto JSON
       let productos = JSON.parse(m.responseText)
       //-- Borrar el resultado anterior que hubiese en el párrafo
       //-- de resultado
       sugerencias.innerHTML = "";
       if (productos.length!=0) {
         //--Recorrer los productos del objeto JSON
         for (let i=0; i < productos.length; i++) {
          //-- Añadir cada producto al párrafo de visualización
           sugerencias.innerHTML += productos[i];

           //-- Separamos los productos por ',''
           if (i < productos.length-1) {
             sugerencias.innerHTML += ', ';
           }
         }
       } else {
         sugerencias.innerHTML = "No hay sugerencias";
       }
     }
   }

   //-- Enviar la petición!
   m.send();
}
