// app/assets/javascript/welcome.js

document.addEventListener('DOMContentLoaded', function() {
  console.log('La página de bienvenida se ha cargado completamente.');

  // Intenta analizar la cadena JSON
  function parsearJson(jsonData) {
    try {
      return JSON.parse(jsonData);
    } catch (error) {
      console.error('Error al analizar el JSON:', error);
      return null;
    }
  }

  // Crea la tabla y agrega el encabezado
  function crearTabla(parsedData) {
    var table = document.createElement('table');
    table.border = '1';

    var headerRow = table.insertRow();
    ['ID', 'DESDE', 'HASTA', 'ESPACIO'].forEach(function(header) {
      var th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });

    // Itera sobre los datos JSON y crea filas
    parsedData.forEach(function(item) {
      var row = table.insertRow();
      ['idReserva', 'desde', 'hasta', 'espacio'].forEach(function(key) {
        var cell = row.insertCell();
        cell.textContent = item[key];
      });
    });

    return table;
  }

  // Agrega la tabla al contenedor especificado
  function agregarTablaAlContenedor(table) {
    var tablaContainer = document.getElementById('tabla-container');
    tablaContainer.innerHTML = ''; // Limpiar contenido existente
    tablaContainer.appendChild(table);
  }

  // Función para actualizar la tabla con nuevos datos
  function renderizarTabla() {
    var jsonData = window.jsonData;
    console.log('Table Data:', jsonData);

    var parsedData = parsearJson(jsonData);

    if (Array.isArray(parsedData)) {
      var table = crearTabla(parsedData);
      agregarTablaAlContenedor(table);
    } else {
      console.error('Error: El JSON no es un array.');
    }
  }

  // Configuración de Action Cable
//  App.notificarCambios = App.cable.subscriptions.create("NotificarCambiosChannel", {
//    connected() {
//      console.log("Conectado al canal de notificación");
//    },

//    disconnected() {
//      console.log("Desconectado del canal de notificación");
//    },

//    received(data) {
//      console.log("Datos Recibidos: ", data);

//      // Al recibir la notificación, hacer una solicitud REST para obtener los datos actualizados
//      solicitarDatosActualizados();
//    }
//  });

  // Función para solicitar datos actualizados a través de REST
  function solicitarDatosActualizados() {
    fetch('/welcome/index') // Asegúrate de que la ruta sea correcta
      .then(response => response.json())
      .then(data => {
        // Actualizar jsonData y renderizar la tabla
        window.jsonData = JSON.stringify(data); // Ajusta según la estructura de tus datos
        renderizarTabla();
      })
      .catch(error => {
        console.error('Error al obtener datos actualizados:', error);
      });
  }

  // Renderizar la tabla al cargar la página inicialmente
  renderizarTabla();
});
