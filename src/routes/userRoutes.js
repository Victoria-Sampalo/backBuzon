const {resError, prevenirInyeccionCodigo, esPassSegura, validName, validEmail, catchAsync, response, generarHashpass, ClientError } = require('../utils/indexUtils')
import { pool } from '../services/db.js'
import express from 'express';
const router = express.Router()
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })


const prueba= async (req,res)=>{
    const respuesta=await pool.query('SELECT NOW()')
    // Responde con la lista de usuarios y código de estado 200 (OK)
    response(res, 200, respuesta);
}

router.get("/users", urlencodedParser, prueba)

module.exports = router;