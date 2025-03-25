const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/eliminar/:folio',async(req,res)=>{
    const{folio}=req.params;
    await pool.query('delete from usuarios where folio= ?',[folio]);
    res.redirect('/alumnos/');
})



router.get('/guardar', (req, res) => {
    res.render('alumnos/inscripcion');
});

router.post('/guardar', async(req, res) =>{
    console.log(req.body);
    const {folio, nombre, apellidos, dia, mes, año, grupo, grado, turno} = req.body;
    const nuevoAlumno = {
        // Crear nuevo objeto
        folio, 
        nombre, 
        apellidos, 
        dia, 
        mes, 
        año, 
        grupo,  
        grado, 
        turno
    } 
    // Fornular la sentencia sql
    await pool.query('insert into usuarios set ?', [nuevoAlumno]);

    res.redirect('/alumnos/');
});

router.post('/guardar', async(req, res) =>{
    console.log(req.body);
    const {folio, nombre, apellidos, dia, mes, año, grupo, grado, turno} = req.body;
    const nuevoAlumno = {
        // Crear nuevo objeto
        folio, 
        nombre, 
        apellidos, 
        dia, 
        mes, 
        año, 
        grupo,  
        grado, 
        turno
    } 
    // Fornular la sentencia sql
    await pool.query('insert into usuarios set ?', [nuevoAlumno]);

    res.redirect('/alumno/');
});

// Peticion para consultar la tabla usuarios
router.get('/', async(req,res) =>{
    const alumnos = await pool.query('Select * from usuarios');
    res.render('alumnos/listaAlumnos', {alumnos});

}) 

module.exports = router;