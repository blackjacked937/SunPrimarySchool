const fs = require('fs');
const handlebars = require('handlebars');

// Cargar tu plantilla handlebars desde 'src/views'
const templateSource = fs.readFileSync('src/views/home.hbs', 'utf8');
console.log('Plantilla cargada correctamente');

const template = handlebars.compile(templateSource);

// Registra los partials (si es necesario)
// Ejemplo de cómo registrar un partial
// const partialSource = fs.readFileSync('src/views/partials/navegador.hbs', 'utf8');
// handlebars.registerPartial('navegador', partialSource);

// Datos para la plantilla
const data = { title: 'Mi Proyecto Handlebars' };

// Generar el HTML
const result = template(data);

// Crear la carpeta 'public' si no existe
if (!fs.existsSync('public')) {
    console.log('Carpeta public no encontrada, creando...');
    fs.mkdirSync('public');
}

// Guardar el archivo HTML generado en 'public'
fs.writeFileSync('public/index.html', result);
console.log('El archivo HTML ha sido generado exitosamente en la carpeta "public"');
