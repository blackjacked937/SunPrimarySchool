const ISR =8/100;

let percepciones= function(salario){
    return salario *8 *15
}

let deducciones = function(salario){
    return percepciones(salario)*ISR
}

let sueldoTotal = function(salario){
    return percepciones(salario)-deducciones
}
let totalEmpleados =function(empleados){
    return empleados.length;
}

let sueldo= function(salario){
    return percepciones(salario)-deducciones(salario);
}




let determinarEstatus = function(promedio) {
  if (promedio >= 0 && promedio < 8.0) {
    return "<span class='text-danger'>Reprobado</span>";
  } else if (promedio >= 8.0 && promedio <= 10.0) {
    return "<span class='text-primary'>Aprobado</span>";
  } else {
    return "";
  }
};


function calcularPromedio(nota1, nota2, nota3) {
  return (nota1 + nota2 + nota3) / 3;
}


function actualizarTabla() {
  var tabla = document.getElementById('alumnosTable').getElementsByTagName('tbody')[0];
  tabla.innerHTML = '';

  for (var i = 0; i < alumnos.length; i++) {
    var alumno = alumnos[i];

    var fila = document.createElement('tr');

    var nombreColumna = document.createElement('td');
    nombreColumna.innerHTML = alumno.nombre;
    fila.appendChild(nombreColumna);

    var apellidoColumna = document.createElement('td');
    apellidoColumna.innerHTML = alumno.apellido;
    fila.appendChild(apellidoColumna);

    var nota1Columna = document.createElement('td');
    nota1Columna.innerHTML = alumno.nota1;
    fila.appendChild(nota1Columna);

    var nota2Columna = document.createElement('td');
    nota2Columna.innerHTML = alumno.nota2;
    fila.appendChild(nota2Columna);

    var nota3Columna = document.createElement('td');
    nota3Columna.innerHTML = alumno.nota3;
    fila.appendChild(nota3Columna);

    var promedio = calcularPromedio(alumno.nota1, alumno.nota2, alumno.nota3);

    var promedioColumna = document.createElement('td');
    promedioColumna.innerHTML = promedio.toFixed(2);
    fila.appendChild(promedioColumna);

    var statusColumna = document.createElement('td');
    statusColumna.innerHTML = determinarEstatus(promedio);
    fila.appendChild(statusColumna);

    var opcionesColumna = document.createElement('td');

    var eliminarBoton = document.createElement('button');
    eliminarBoton.innerHTML = 'Eliminar';
    eliminarBoton.className = 'btn btn-danger';
    eliminarBoton.setAttribute('data-id', i);
    eliminarBoton.addEventListener('click', function() {
      var id = parseInt(this.getAttribute('data-id'));
      alumnos.splice(id, 1);
      guardarAlumnosEnLocalStorage();
      actualizarTabla();
    });
    opcionesColumna.appendChild(eliminarBoton);

    var editarBoton = document.createElement('button');
    editarBoton.innerHTML = 'Editar';
    editarBoton.className = 'btn btn-primary';
    editarBoton.setAttribute('data-id', i);
    editarBoton.addEventListener('click', function() {
      var id = parseInt(this.getAttribute('data-id'));
      var alumno = alumnos[id];
      document.getElementById('nombre').value = alumno.nombre;
      document.getElementById('apellido').value = alumno.apellido;
      document.getElementById('nota1').value = alumno.nota1;
      document.getElementById('nota2').value = alumno.nota2;
      document.getElementById('nota3').value = alumno.nota3;

      document.getElementById('registroForm').setAttribute('data-id', id);
      document.getElementById('registroBtn').innerHTML = 'Actualizar';
    });
    opcionesColumna.appendChild(editarBoton);

    fila.appendChild(opcionesColumna);

    tabla.appendChild(fila);
  }
}


function guardarAlumnosEnLocalStorage() {
  localStorage.setItem('alumnos', JSON.stringify(alumnos));
}


function cargarAlumnosDesdeLocalStorage() {
  var alumnosGuardados = localStorage.getItem('alumnos');
  if (alumnosGuardados) {
    alumnos = JSON.parse(alumnosGuardados);
    actualizarTabla();
  }
}

cargarAlumnosDesdeLocalStorage();

document.getElementById('registroForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var nombre = document.getElementById('nombre').value;
  var apellido = document.getElementById('apellido').value;
  var nota1 = parseFloat(document.getElementById('nota1').value);
  var nota2 = parseFloat(document.getElementById('nota2').value);
  var nota3 = parseFloat(document.getElementById('nota3').value);

  var promedio = calcularPromedio(nota1, nota2, nota3);
  var status = determinarEstatus(promedio);

  var id = parseInt(this.getAttribute('data-id'));

  if (id !== null && !isNaN(id)) {
    // Actualizar alumno existente
    alumnos[id] = {
      nombre: nombre,
      apellido: apellido,
      nota1: nota1,
      nota2: nota2,
      nota3: nota3,
    };
    this.removeAttribute('data-id');
    document.getElementById('registroBtn').innerHTML = 'Registrar';
  } else {
    // Registrar nuevo alumno
    var nuevoAlumno = {
      nombre: nombre,
      apellido: apellido,
      nota1: nota1,
      nota2: nota2,
      nota3: nota3,
    };
    alumnos.push(nuevoAlumno);
  }

  document.getElementById('nombre').value = '';
  document.getElementById('apellido').value = '';
  document.getElementById('nota1').value = '';
  document.getElementById('nota2').value = '';
  document.getElementById('nota3').value = '';

  guardarAlumnosEnLocalStorage();
  actualizarTabla();
});


actualizarTabla();

