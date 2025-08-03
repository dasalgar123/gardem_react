const mysql = require('mysql2');

// Configuración de la base de datos
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '', // Cambia esto por tu contraseña si la tienes
  database: 'gardelcatalogo',
  port: 3306
};

// Crear conexión
const connection = mysql.createConnection(dbConfig);

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL gardelcatalogo');
});

module.exports = connection; 