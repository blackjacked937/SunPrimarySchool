const express = require('express');
const pool = require('../database');
const router = express.Router();
router.get('/', (req, res)=>{
    res.render('home')
});  
 
router.get('/calendario', (req, res)=>{
    res.render('calendario')
}); 

router.get('/pagos', (req, res)=>{
    res.render('pagos')
});

router.get('/signup', async(req,res)=>{
    res.render('formLogin')
}) 
 
router.post("/signup", async(req,res) =>{
    console.log(req.body); 
    const folio = req.body.folio;
    const dia = req.body.dia;
    const mes = req.body.mes;
    const año = req.body.año; 
    const resultado = await pool.query('select * from usuarios where folio = ? and dia = ? and mes = ? and año = ?', [folio, dia, mes, año]);
    console.log(resultado)
    if(folio == 'docente@sep.mx' && dia == 'dia7' && mes == 'enero' && año == '2003'){
        res.render('docente')  
    }if( resultado != ''){
        if(resultado[0].folio == folio && resultado[0].dia == dia && resultado[0].mes == mes && resultado[0].año == año){
            // res.render('alumno') 
            res.render('alumno') 
        }
    }else{
        res.render('./formLogin');
    }
});

router.get('/registrar', (req, res) => {
    res.render('calificaciones/registro');
});

module.exports = router;