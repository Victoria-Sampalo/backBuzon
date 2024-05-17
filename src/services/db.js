const { Pool } = require('pg');
// usamos dtenv para las variables de entorno 
require('dotenv').config()

// URL de conexión a tu base de datos PostgreSQL
const connectionString = process.env.EXTERNAL_DB_URL;

// Configurar el Pool
export const pool = new Pool({
  connectionString: connectionString,
  SSL:true
});



