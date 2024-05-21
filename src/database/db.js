const { Pool } = require('pg');

const fs = require('fs');
 // Agregamos esta línea para importar el módulo path
const path = require('path');

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

async function executeSQLFromFile(filePath) {
  try {
    const sql = fs.readFileSync(filePath, 'utf8');
    const respuesta = await pool.query(sql);
    console.log(respuesta)
    console.log(`${path.basename(filePath)} ejecutado correctamente`);
  } catch (error) {
    console.error(`Error al ejecutar ${path.basename(filePath)}:`, error);
    throw error;
  }
}

async function executeSQLfromQuery(query) {
  try {
    const respuesta = await pool.query(query);
    return respuesta
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function initializeDatabase() {
  await executeSQLFromFile(path.join(__dirname, 'buzondb.sql'));
}

module.exports = { pool, initializeDatabase, executeSQLfromQuery };