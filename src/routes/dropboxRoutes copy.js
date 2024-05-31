const express = require('express');
const { uploadFileToDropbox, downloadFileFromDropbox, listFilesInDropbox, verifyDropboxConnection } = require('../controllers/dropboxController');
const multer = require('multer');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Configurar multer para manejar la subida de archivos
const upload = multer({ dest: './uploads/' });

// Ruta para subir archivos a Dropbox
router.post('/upload', upload.single('file'), uploadFileToDropbox);

// Ruta para descargar archivos desde Dropbox
router.get('/download', urlencodedParser, downloadFileFromDropbox);

// Ruta para listar archivos en Dropbox
router.get('/list', urlencodedParser, listFilesInDropbox);

// Ruta para verificar la conexión con Dropbox
router.get('/verify', verifyDropboxConnection);

module.exports = router;
