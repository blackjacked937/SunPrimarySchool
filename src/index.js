const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Servir archivos estáticos (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
  res.render('home', { title: 'Mi Proyecto Handlebars' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
