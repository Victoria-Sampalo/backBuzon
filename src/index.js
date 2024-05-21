//usamos express como freamwork
const express=require('express');
const cors = require('cors'); // Importa el paquete cors
const userRoutes=require("./routes/userRoutes");
const loginRoutes=require("./routes/loginRoutes");
const resetRoutes=require("./routes/resetRoutes")
const {resError} = require('./utils/indexUtils');
const { ClientError } = require('./utils/clientError');
const { initializeDatabase, executeSQLfromQuery } = require('./database/db');


// usamos dtenv para las variables de entorno 
require('dotenv').config()

const app=express();
// Middleware para parsear el cuerpo de la solicitud como JSON
app.use(express.json());
// le asignamos una constante a las rutas de usuario

// donde escucha el servidor 
app.listen(process.env.PORT);
app.use(cors());



// async function startServer() {
//   try {
//     await initializeDatabase();

//     app.use('/api', userRoutes);
//     app.use('/api', loginRoutes);

//     app.use((err, req, res, next) => {
//       const statusCode = err.status || 500;
//       const message = err.message || 'Error interno del servidor';
//       resError(res, statusCode, message);
//     });

//     const PORT = process.env.PORT_NODE || 4000;
//     app.listen(PORT, () => {
//       console.log(`Server running on http://localhost:${PORT}/`);
//     });
//   } catch (error) {
//     console.error('Error al inicializar la base de datos:', error);
//     process.exit(1);
//   }
// }

// startServer();

app.use('/api',userRoutes)
app.use('/api',loginRoutes)
app.use('/api', resetRoutes)
//le pasamos el manejador de errores en vez del suyo para no mostrar la ruta del error
app.use((err,req,res,next)=>{
  const statusCode=err.status || 500;
  const message=err.message || 'Error interno del servidor';
  resError(res,statusCode,message)
})


// Escuchar en el puerto definido en las variables de entorno
const PORT = process.env.PORT_NODE || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
