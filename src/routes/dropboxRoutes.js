const express = require('express');
const { uploadFileToDropbox, verifyDropboxConnection, listFilesInDropbox, checkFolderExistence, listDirectoriesInDropbox } = require('../controllers/dropboxController');
const multer = require('multer');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Configurar multer para manejar la subida de archivos
const upload = multer({ dest: 'uploads/' });

// Ruta para subir archivos a Dropbox
router.post('/upload', upload.single('file'), uploadFileToDropbox);

// Ruta para verificar la conexión con Dropbox
router.get('/verify', verifyDropboxConnection);


router.get('/getallfiles', listFilesInDropbox);

router.get('/checkfolder', checkFolderExistence);


router.get('/listfolder', listDirectoriesInDropbox);



module.exports = router;
