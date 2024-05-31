const Dropbox = require('dropbox').Dropbox;
const fs = require('fs');
const path = require('path');
const { response, catchAsync, ClientError } = require('../utils/indexUtils');

// Crear instancia del cliente de Dropbox
let dbx;
(async () => {
  const fetch = (await import('node-fetch')).default;
  dbx = new Dropbox({
    accessToken: process.env.DROPBOX_ACCESS_TOKEN,
    fetch: fetch,
  });
})();

// Verificar conexión con Dropbox
const verifyDropboxConnection = async (req, res) => {
    try {
      const accountInfo = await dbx.usersGetCurrentAccount();
      response(res, 200, { message: 'Conexión exitosa con Dropbox', accountInfo });
    } catch (error) {
      console.error('Error verificando conexión con Dropbox:', error);
      res.status(400).json({ error: true, message: 'Error verificando conexión con Dropbox', details: error });
    }
  };

// Subir archivo a Dropbox
const uploadFileToDropbox = async (req, res) => {
    try {
      const { file } = req;
      if (!file) {
        throw new ClientError('No se proporcionó ningún archivo', 400);
      }
  
      console.log('File received:', file);
  
      const fileExtension = path.extname(file.originalname) || '.pdf';
      const filePath = path.join(__dirname, '../uploads', `${file.filename}${fileExtension}`);
      
      console.log('File path with extension:', filePath);
  
      // Renombrar el archivo temporal para agregar la extensión
      fs.renameSync(file.path, filePath);
      console.log('File renamed successfully');
  
      const dropboxPath = `/${file.originalname}`;
      const fileContent = fs.readFileSync(filePath);
  
      console.log('File content read successfully');
  
      const responseDropbox = await dbx.filesUpload({
        path: dropboxPath,
        contents: fileContent,
      });
  
      console.log('File uploaded to Dropbox successfully:', responseDropbox);
  
      response(res, 200, responseDropbox);
    } catch (error) {
      console.error('Error in uploadFileToDropbox:', error);
      res.status(400).json({ error: true, message: error.message });
    }
  };

// Descargar archivo de Dropbox
const downloadFileFromDropbox = async (req, res) => {
  const { path } = req.query;
  if (!path) {
    throw new ClientError('No se proporcionó la ruta del archivo', 400);
  }

  const responseDropbox = await dbx.filesDownload({ path });

  const downloadPath = path.join(__dirname, './downloads', responseDropbox.name);
  
  fs.writeFileSync(downloadPath, responseDropbox.fileBinary, 'binary');

  response(res, 200, { message: 'Archivo descargado exitosamente de Dropbox', responseDropbox });
};

// Listar archivos de Dropbox
const listFilesInDropbox = async (req, res) => {
  const { path } = req.query;
  const responseDropbox = await dbx.filesListFolder({ path: path || '' });

  response(res, 200, { message: 'Archivos listados exitosamente', responseDropbox });
};

module.exports = {
  uploadFileToDropbox: catchAsync(uploadFileToDropbox),
  downloadFileFromDropbox: catchAsync(downloadFileFromDropbox),
  listFilesInDropbox: catchAsync(listFilesInDropbox),
  verifyDropboxConnection:catchAsync(verifyDropboxConnection)
};
