//usamos express como freamwork
const express=require('express');
const cors = require('cors'); // Importa el paquete cors
const {resError} = require('./utils/indexUtils');
const { ClientError } = require('./utils/clientError');


// usamos dtenv para las variables de entorno 
require('dotenv').config()

const app=express();
// Middleware para parsear el cuerpo de la solicitud como JSON
app.use(express.json());
// le asignamos una constante a las rutas de usuario

// donde escucha el servidor 
app.listen(process.env.PORT_NODE);
console.log('http://localhost:4000/')
app.use(cors());
//le ponemos un "prefijo" a las rutas
//app.use('/api',indexRoutes)
//le pasamos el manejador de errores en vez del suyo para no mostrar la ruta del error
app.use((err,req,res,next)=>{
  const statusCode=err.status || 500;
  const message=err.message || 'Error interno del servidor';
  resError(res,statusCode,message)
})
