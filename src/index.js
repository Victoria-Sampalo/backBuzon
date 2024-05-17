// Importar express y otros módulos necesarios
import express from 'express';
import cors from 'cors';
import { resError } from './utils/indexUtils.js';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';

// Configurar las variables de entorno
dotenv.config();

// Crear una instancia de express
const app = express();

// Middleware para parsear el cuerpo de la solicitud como JSON
app.use(express.json());

// Middleware para habilitar CORS
app.use(cors());

// Middleware para las rutas de usuario
app.use('/api', userRoutes);

// Middleware para manejar errores
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Error interno del servidor';
  resError(res, statusCode, message);
});

// Escuchar en el puerto definido en las variables de entorno
const PORT = process.env.PORT_NODE || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
