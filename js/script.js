var actividades = [];

function agregarActividad() {
  var actividad = document.getElementById("actividad").value;
  if (actividad.trim() !== "") {
    var nuevaActividad = { id: ('UUID v4:', uuid.v4()), descripcion: actividad };
    actividades.push(nuevaActividad);
    
    document.getElementById("actividad").value = "";
    mostrarActividades();
    enviarActividadAlServidor(nuevaActividad);
  }
}

// Función para mostrar las actividades en una tabla
function mostrarActividades() {
  var tablaBody = document.getElementById("tbData");
  tablaBody.innerHTML = "";
  actividades.forEach(function(actividad) {
    var fila = document.createElement("tr");
  
    var celdaDescripcion = document.createElement("td");
    celdaDescripcion.textContent = actividad.descripcion;
    
    var celdaBotones = document.createElement("td");
    var botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", function() {
      eliminarActividad(actividad.id);
    });
    
    var botonModificar = document.createElement("button");
    botonModificar.textContent = "Modificar";
    botonModificar.addEventListener("click", function() {
      modificarActividad(actividad.id);
    });
    
    celdaBotones.appendChild(botonEliminar);
    celdaBotones.appendChild(botonModificar);
    
    fila.appendChild(celdaDescripcion);
    fila.appendChild(celdaBotones);
    
    tablaBody.appendChild(fila);
  });
}

// Función para eliminar una actividad de la lista
function eliminarActividad(id) {
  actividades = actividades.filter(function(actividad) {
    return actividad.id !== id;
  });
  
  mostrarActividades();
  eliminarActividadDelServidor(id);
}

function modificarActividad(id) {
  var actividad = actividades.find(function(actividad) {
    return actividad.id === id;
  });
  
  if (actividad) {
    var nuevoTexto = prompt("Ingrese el nuevo texto:", actividad.descripcion);
    if (nuevoTexto !== null) {
      actividad.descripcion = nuevoTexto;

      mostrarActividades();
      modificarActividadEnServidor(actividad);
    }
  }
}

// Función para enviar una actividad al servidor mediante AJAX
function enviarActividadAlServidor(actividad) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/guardar-actividad", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log("Actividad guardada en el servidor");
    }
  };
  xhr.send(JSON.stringify(actividad));
}

// Función para eliminar una actividad del servidor mediante AJAX
function eliminarActividadDelServidor(id) {
  var xhr = new XMLHttpRequest();
  xhr.open("DELETE", "/eliminar-actividad?id=" + id, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log("Actividad eliminada del servidor");
    }
  };
  xhr.send();
}

// Función para modificar una actividad en el servidor mediante AJAX
function modificarActividadEnServidor(actividad) {
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", "/modificar-actividad", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log("Actividad modificada en el servidor");
    }
  };
  xhr.send(JSON.stringify(actividad));
}

mostrarActividades();
