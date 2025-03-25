const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/registrar', (req, res) => {
    res.render('calificaciones/registro');
});



module.exports = router;