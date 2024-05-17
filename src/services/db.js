const { Pool } = require('pg');
// usamos dotenv para las variables de entorno 
require('dotenv').config();

// URL de conexión a tu base de datos PostgreSQL
const connectionString = process.env.EXTERNAL_DB_URL;

// Configurar el Pool
const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false // Usar "false" si estás utilizando un certificado autofirmado (No recomendado para producción)
  }
});


module.exports = { pool };