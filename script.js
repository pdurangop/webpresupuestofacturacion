document.addEventListener("DOMContentLoaded", function() {
    // Ruta del archivo JSON
    const rutaJSON = 'contenido.json';
  
    fetch(rutaJSON)
      .then(response => response.json())
      .then(data => {
        // Obtener la tabla actual
        const tablaActual = obtenerTablaActual();
  
        // Recorrer los datos y agregar filas a la tabla actual
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const item = data[key];
            const fila = document.createElement('tr');
  
            // Crear celda para el checkbox
            const celdaCheckbox = document.createElement('td');

            // Crear el checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';

            // Agregar el checkbox a la celda
            celdaCheckbox.appendChild(checkbox);

            // Agregar la celda al inicio de la fila
            fila.appendChild(celdaCheckbox);

            // Crear celdas para cada propiedad del objeto JSON
            for (const prop in item) {
                if (item.hasOwnProperty(prop)) {
                    const celda = document.createElement('td');
                    celda.textContent = item[prop];
                    fila.appendChild(celda);
                }
            }
  
            // Agregar la fila a la tabla actual
            tablaActual.querySelector('tbody').appendChild(fila);
          }
        }
  
        // Función para obtener la tabla actual
        function obtenerTablaActual() {
          return document.getElementById('tablaDatos');
        }
  
        // Función para crear una nueva tabla
        function crearNuevaTabla(filas) {
          // Crear una tabla
          const tabla = document.createElement('table');
          tabla.classList.add('tabla-nueva');
  
          // Crear la cabecera de la tabla (thead)
          const thead = document.createElement('thead');
          tabla.appendChild(thead);
  
          // Crear una fila (tr) para los encabezados
          const filaEncabezados = document.createElement('tr');
          thead.appendChild(filaEncabezados);
  
          // Agregar un encabezado
          const th = document.createElement('th');
          th.textContent = 'Valor';
          filaEncabezados.appendChild(th);
  
          // Crear el cuerpo de la tabla (tbody)
          const tbody = document.createElement('tbody');
          tabla.appendChild(tbody);
  
          // Recorrer las filas y agregarlas a la tabla
          for (const fila of filas) {
            // Crear una fila (tr)
            const tr = document.createElement('tr');
            tbody.appendChild(tr);
  
            // Agregar una celda (td) con el valor
            const td = document.createElement('td');
            td.textContent = fila.textContent;
            tr.appendChild(td);
          }
  
          return tabla;
        }
  
        // Función para mostrar la tabla
        function mostrarTabla(tabla) {
          tabla.style.display = 'table';
        }
  
        // Obtener los checkbox seleccionados de la tabla actual
        const checkboxSeleccionados = document.querySelectorAll('input[type="checkbox"]:checked');
        console.log(Object.values(checkboxSeleccionados));
  
        // Crear la nueva tabla
        const nuevaTabla = crearNuevaTabla(checkboxSeleccionados);
  
        // Agregar la nueva tabla al DOM después de la tabla actual
        document.getElementById('contenedor-nueva-tabla').appendChild(nuevaTabla);
  
        // Ocultar la tabla actual
        tablaActual.classList.add('hidden');
  
        // Agregar evento al botón "Siguiente"
        const btnSiguiente = document.getElementById('btn_Siguiente');
        btnSiguiente.addEventListener('click', function() {
          mostrarTabla(nuevaTabla);
        });
      })
      .catch(error => console.error('Error al leer el archivo JSON:', error));
  });
  
  