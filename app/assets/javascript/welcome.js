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

      // Agrega la tabla al cuerpo del documento
      document.body.appendChild(table);
    } else {
      console.error('Error: El JSON no es un array.');
    }
  } catch (error) {
    console.error('Error al analizar el JSON:', error);
  }
});
 
 
 // hay error en la linea 9, al parecer parse esta generando conflictos o no esta funcionando,
 //PERO ya se obtubieron avances y se puede obtener el json del controlador a la vista a js
 