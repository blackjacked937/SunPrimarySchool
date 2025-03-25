// Importaciones
const express = require('express');
const morgan = require('morgan')
const {engine} = require('express-handlebars')
const path = require('path')

// Inicializaciones
const app = express();
 
// Settings
app.set('port', process.env.PORT || 7777);
const ruta = __dirname;

// console.log(ruta);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main', 
    LayoutsDir: path.join(app.get('views'), 'layouts'),
    PartialsDir:path.join(app.get('views'), 'partials'),
    extname:'hbs',
    helpers:require('./lib/handlebars')}))
// Usar la connfiguracion
app.set('view engine', '.hbs'); 

// middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}));
// Morgan para revisar el tiempo de importacion

// Variables globales
app.use((req,res,next) => {
    next();
})

// Routes
// app.use(require('./routes/index.js'))

app.use(require('./routes'))
app.use('/alumnos', require('./routes/alumnos'));

app.use('/calificaciones', require('./routes/calificaciones'))
/*
app.use('/usuarios', require('./routes/usuarios'))
*/

// public
app.use(express.static(path.join(__dirname, 'public')));
// Starting the server
app.listen(app.get('port'), ()=>{
    console.log('Server port: ', app.get('port'));
});