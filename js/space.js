/* Realizar la solicitud al servidor https://images-api.nasa.gov/ y añadir el parámetro de búsqueda con el texto ingresado por el usuario. Si el usuario realiza, por ejemplo, la búsqueda "andromeda", la consulta se deberá realizar de la siguiente manera: 
https://images-api.nasa.gov/search?q=andromeda
Mostrar al usuario la lista de imágenes devuelta, con su información (al menos imagen, título, descripción y fecha).*/

//Dar funcionalidad al boton Buscar sobre el contenido que se escribe en el campo de texto

document.getElementById('btnBuscar').addEventListener('click', () => {
    let search = document.getElementById('inputBuscar').value //Obtener lo ingresado en el campo de texto
    const URL = `https://images-api.nasa.gov/search?q=${encodeURIComponent(search)}`; //Se crea url al servidor + parametro de busqueda 
  //encodeURIComponent es para codificar una URI (Uniform Resource Identifier) o parte de ella. El propósito es asegurar que los caracteres en una cadena de texto sean válidos para usar en una URL.
              
  fetch(URL)
  .then(response => {
     if(!response.ok) {
        throw new Error('Error al cargar los resultados');
     }  
     return response.json();
  })
  .then(data => {
    showResults(data.collection.items);
  })
  .catch(error => {
    console.error('Ha ocurrido un error:', error);
    document.getElementById('contenedor').innerHTML = '<li class="text-danger">Error al cargar los resultados.</li>';                   
  });
});

function showResults(items) {
    const contenedor = document.getElementById('contenedor'); //,div 'contenedor'..> esta en html. Espacio para poner tarejta con resultados de busqueda
    contenedor.innerHTML = ''; // Limpia el contenedor antes de mostrar nuevos resultados

    if (items.length === 0) {
        contenedor.innerHTML = '<p>No se han encontrado resultados.</p>';
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'col-12 col-md-4 mb-2'; // Clases de Bootstrap para ancho y margen

        // Comprobar si hay un enlace de alguna imagen disponible
        const imageUrl = item.links ? item.links[0].href : '';

        //tarjeta de Bootstrap con datos a mostrar en la pagina
        card.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${imageUrl}" class="card-img-top" alt="${item.data[0].title}">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Título:</strong> ${item.data[0].title}</li>
                    <li class="list-group-item"><strong>Descripción:</strong> ${item.data[0].description || 'Descripción no disponible.'}</li>
                    <li class="list-group-item"><small class="text-muted"><strong>Fecha:</strong> ${item.data[0].date_created || 'Fecha no disponible'}</small></li>
                </ul>
            </div>
        `;
        contenedor.appendChild(card); // Agrega la tarjeta al contenedor con el contenido
    });
};




