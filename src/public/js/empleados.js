const ISR = 8 / 100;

let percepciones = function(salario) {
  return salario * 8 * 15;
};

let deducciones = function(salario) {
  return percepciones(salario) * ISR;
};

let sueldoTotal = function(salario) {
  return percepciones(salario) - deducciones(salario);
};

let totalEmpleados = function(empleados) {
  return empleados.length;
};

let sueldo = function(salario) {
  return percepciones(salario) - deducciones(salario);
};

let calcularSueldoTotal = function(sueldoHora, diasTrabajados) {
  let sueldoBase = sueldoHora * 8 * diasTrabajados;
  let bonificacion = 0;
  if (diasTrabajados === 7) {
    bonificacion = sueldoBase * 0.07;
  }
  let percepcionesSemanales = sueldoBase + bonificacion;
  let deduccionesSemanales = percepcionesSemanales * ISR;
  let sueldoTotal = percepcionesSemanales - deduccionesSemanales;
  return {
    sueldoBase: sueldoBase,
    bonificacion: bonificacion,
    percepciones: percepcionesSemanales,
    deducciones: deduccionesSemanales,
    sueldoTotal: sueldoTotal
  };
};

let empleados = [];

function actualizarTabla() {
  var tabla = document.getElementById('empleadosTable').getElementsByTagName('tbody')[0];
  tabla.innerHTML = '';

  for (var i = 0; i < empleados.length; i++) {
    var empleado = empleados[i];

    var fila = document.createElement('tr');

    var nombreColumna = document.createElement('td');
    nombreColumna.innerHTML = empleado.nombre;
    fila.appendChild(nombreColumna);

    var puestoColumna = document.createElement('td');
    puestoColumna.innerHTML = empleado.puesto;
    fila.appendChild(puestoColumna);

    var generoColumna = document.createElement('td');
    generoColumna.innerHTML = empleado.genero;
    fila.appendChild(generoColumna);

    var sueldoHoraColumna = document.createElement('td');
    sueldoHoraColumna.innerHTML = empleado.sueldoHora;
    fila.appendChild(sueldoHoraColumna);

    var diasTrabajadosColumna = document.createElement('td');
    diasTrabajadosColumna.innerHTML = empleado.diasTrabajados;
    fila.appendChild(diasTrabajadosColumna);

    var sueldoTotalInfo = calcularSueldoTotal(empleado.sueldoHora, empleado.diasTrabajados);
    var sueldoBaseColumna = document.createElement('td');
    sueldoBaseColumna.innerHTML = sueldoTotalInfo.sueldoBase.toFixed(2);
    fila.appendChild(sueldoBaseColumna);

    var bonificacionColumna = document.createElement('td');
    bonificacionColumna.innerHTML = sueldoTotalInfo.bonificacion.toFixed(2);
    fila.appendChild(bonificacionColumna);

    var percepcionesColumna = document.createElement('td');
    percepcionesColumna.innerHTML = sueldoTotalInfo.percepciones.toFixed(2);
    fila.appendChild(percepcionesColumna);

    var deduccionesColumna = document.createElement('td');
    deduccionesColumna.innerHTML = sueldoTotalInfo.deducciones.toFixed(2);
    fila.appendChild(deduccionesColumna);

    var sueldoTotalColumna = document.createElement('td');
    sueldoTotalColumna.innerHTML = sueldoTotalInfo.sueldoTotal.toFixed(2);
    fila.appendChild(sueldoTotalColumna);

    var eliminarBotonColumna = document.createElement('td');
    var eliminarBoton = document.createElement('button');
    eliminarBoton.innerHTML = 'Eliminar';
    eliminarBoton.className = 'btn btn-danger';
    eliminarBoton.setAttribute('data-id', i);
    eliminarBoton.addEventListener('click', function() {
      var id = parseInt(this.getAttribute('data-id'));
      empleados.splice(id, 1);
      guardarEmpleadosEnLocalStorage();
      actualizarTabla();
    });
    eliminarBotonColumna.appendChild(eliminarBoton);
    fila.appendChild(eliminarBotonColumna);

    tabla.appendChild(fila);
  }
}

function guardarEmpleadosEnLocalStorage() {
  localStorage.setItem('empleados', JSON.stringify(empleados));
}

function cargarEmpleadosDesdeLocalStorage() {
  var empleadosGuardados = localStorage.getItem('empleados');
  if (empleadosGuardados) {
    empleados = JSON.parse(empleadosGuardados);
    actualizarTabla();
  }
}

cargarEmpleadosDesdeLocalStorage();

document.getElementById('registroForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var nombre = document.getElementById('nombre').value;
  var puesto = document.getElementById('puesto').value;
  var genero = document.getElementById('genero').value;
  var sueldoHora = parseFloat(document.getElementById('sueldoh').value);
  var diasTrabajados = parseInt(document.getElementById('Dias').value);

  var nuevoEmpleado = {
    nombre: nombre,
    puesto: puesto,
    genero: genero,
    sueldoHora: sueldoHora,
    diasTrabajados: diasTrabajados,
  };
  empleados.push(nuevoEmpleado);

  document.getElementById('nombre').value = '';
  document.getElementById('puesto').value = '';
  document.getElementById('genero').value = '';
  document.getElementById('sueldoh').value = '';
  document.getElementById('Dias').value = '';

  guardarEmpleadosEnLocalStorage();
  actualizarTabla();
});

actualizarTabla();
