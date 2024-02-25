const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));



const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'proyecto-final',
});

mysqlConnection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conexión a la base de datos exitosa...');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pagina-principal.html'));

});

// Configuración para servir archivos estáticos desde el directorio actual
app.use(express.static(path.join(__dirname, 'css')));

// Endpoint para el formulario de contacto.html
app.get('/contacto', (req, res) => {
    res.sendFile(path.join(__dirname, 'contacto', 'contacto.html'));
  });
  
app.post('/contacto', (req, res) => {
  const { name, message, email, subject } = req.body;

  const sql = `INSERT INTO contactos (nombre, telefono, direccion, correo) VALUES (?, ?, ?, ?)`;
  const values = [name, message, email, subject];

  mysqlConnection.query(sql, values, (err) => {
    if (err) {
      console.error('Error al agregar contacto: ' + err.stack);
      res.status(500).send('Error al agregar contacto');
    } else {
      console.log('Contacto agregado con éxito');
      res.redirect('/');
    }
  });
});

app.get('/acceder', (req, res) => {
    res.sendFile(path.join(__dirname, 'acceder', 'acceder.html'));
  });

// Endpoint para el formulario de acceso.html
app.post('/acceder', (req, res) => {
  const { email, password, remember } = req.body;

  // Aquí puedes agregar la lógica de autenticación si es necesario

  // Ejemplo de respuesta
  res.send('Acceso exitoso');
});

app.get('/registrar', (req, res) => {
    res.sendFile(path.join(__dirname, 'registrar', 'registrar.html'));
  });

// Endpoint para el formulario de registro.html
app.post('/registrar', (req, res) => {
  const { email, nick, password, repeatPassword } = req.body;

  // Aquí puedes agregar la lógica de registro y validación de datos

  // Ejemplo de respuesta
  res.send('Registro exitoso');
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
