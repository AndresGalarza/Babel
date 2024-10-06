// db.js
require('dotenv').config();
const mariadb = require('mariadb');

// Crear un pool de conexiones
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: 5
});

// Función para obtener una conexión
async function getConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    return conn;
  } catch (err) {
    console.error('Error connecting to MariaDB', err);
    throw err;
  }
}

module.exports = { getConnection };
