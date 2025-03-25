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


let recuperarEmpleados = function(){
    let empleados;
    if(localStorage.getItem('empleados')==null){
        empleados = [];
    }else{
        empleados = JSON.parse(localStorage.getItem('empleados'));
    }
    let msg = "<table class='table table-bordered table-hover'>";
    // Iterar el arreglo empleados
    msg+="<tr><th>Nombre</th><th>Puesto</th><th>Salario</th><th>Percepciones</th><th>Deducciones</th><th>Sueldo Total</th><th>Operaciones</th></tr>"
    empleados.forEach(function(empleado, index){
        msg+="<tr>"
        msg+=`<td>${empleado.nombre}</td>`;
        msg+=`<td>${empleado.puesto}</td>`;
        msg+=`<td>${empleado.salario}</td>`;
        msg+="<td>"+percepciones(empleado.salario)+"</td>"
        msg+="<td>"+deducciones(empleado.salario)+"</td>"
        msg+="<td>"+sueldoTotal(empleado.salario)+"</td>"
        msg+=`<td>&nbsp; &nbsp; <button class='btn btn-danger' onclick='eliminar(${index})'>Eliminar</button> &nbsp; &nbsp; <button class='btn btn-warning' onclick='editar(${index})'>Editar</button></td>`;
        msg+="</tr>"
});
    msg+="<tr><td colspan='7' class = 'text-primary'>Total Empleados:"
    +"<span class='text-danger'>" + totalEmpleados(empleados)+"</span></td></tr>"
    let imprimir = document.querySelector("#imprime");
    imprimir.innerHTML = msg

}
document.onload = recuperarEmpleados();
let eliminar = function(index){
    let empleados;
    if (localStorage.getItem('empleados')==null) {
        // Se crea el arreglo
        empleados = [];
    }else{
        // Recupere los datos almacenados en el LocalStorage
        empleados = JSON.parse(localStorage.getItem('empleados'));
    }
    empleados.splice(index,1);
    localStorage.setItem('empleados', JSON.stringify(empleados));
    recuperarEmpleados();
}
let guardar = function (){
    let nombre = document.querySelector("#nombre").value;
    let puesto = document.querySelector("#puesto").value;
    let salario = document.querySelector("#salario").value;
    // Comprobar la llegada de los datos
    console.log(nombre);
    console.log(puesto);
    console.log(salario);
    // Crear una variable de tipo arreglo
    let empleados;
    if (localStorage.getItem('empleados')==null) {
        // Se crea el arreglo
        empleados = [];
    }else{
        // Recupere los datos almacenados en el LocalStorage
        empleados = JSON.parse(localStorage.getItem('empleados'));
    }
    // Creamos un nuevo empleado
    let empleado = {
        nombre: nombre,
        puesto: puesto,
        salario: salario
    }
    // Agregamos el nuevo empleado
    empleados.push(empleado);
    // Guardanos los empleados al LocalStorage
    localStorage.setItem('empleados', JSON.stringify(empleados));
    // Invocar una funcion para recuperar los datos
    recuperarEmpleados();
}

