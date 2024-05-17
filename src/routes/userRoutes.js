// users.js
import express from 'express';
import { pool } from '../services/db.js';
import { resError, response } from '../utils/indexUtils.js';

const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const prueba = async (req, res) => {
    try {
        const respuesta = await pool.query('SELECT NOW()');
        // Responde con la lista de usuarios y código de estado 200 (OK)
        response(res, 200, respuesta);
    } catch (error) {
        // En caso de error, responde con un error y código de estado 500 (Internal Server Error)
        resError(res, 500, error.message);
    }
};

router.get("/users", urlencodedParser, prueba);

export default router;
