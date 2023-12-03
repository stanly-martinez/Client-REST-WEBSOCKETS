// app/assets/javascript/welcome.js

document.addEventListener('DOMContentLoaded', function() {
  console.log('La página de bienvenida se ha cargado completamente.');

  // Obtén los datos directamente desde la variable JavaScript
  var jsonData = window.jsonData;
  console.log('Table Data:', jsonData);

  // Intenta analizar la cadena JSON
  try {
    var parsedData = JSON.parse(jsonData);

    // Verifica que se haya analizado correctamente
    if (Array.isArray(parsedData)) {
      // Crea la tabla y agrega el encabezado
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
        ['ID', 'DESDE', 'HASTA', 'ESPACIO'].forEach(function(key) {
          var cell = row.insertCell();
          cell.textContent = item[key];
        });
      });

      // Agrega la tabla al contenedor especificado
      var tablaContainer = document.getElementById('tabla-container');
      tablaContainer.appendChild(table);
    } else {
      console.error('Error: El JSON no es un array.');
    }
  } catch (error) {
    console.error('Error al analizar el JSON:', error);
  }

  // Configuración de Action Cable
  App.notificarCambios = App.cable.subscriptions.create("NotificarCambiosChannel", {
    connected() {
      console.log("Conectado al canal de notificación de cambios.");
    },

    disconnected() {
      console.log("Desconectado del canal de notificación de cambios.");
    },

    received(data) {
      console.log("Datos recibidos:", data);

      // recarga de l pagina
      window.location.reload();
    }
  });
});
