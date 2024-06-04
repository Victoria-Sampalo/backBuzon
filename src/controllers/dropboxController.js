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

    // Crear la carpeta uploads si no existe
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
      console.log('Uploads directory created:', uploadsDir);
    }

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


// Listar archivos en Dropbox
const listFilesInDropbox = async (req, res) => {
  try {
    const folderPath = '/Aplicaciones/buzonapp'; 
    console.log('Folder path used:', folderPath);

    const responseDropbox = await dbx.filesListFolder({ path: folderPath });

    console.log('Response from Dropbox:', responseDropbox);

    if (!responseDropbox || !responseDropbox.entries) {
      throw new ClientError('No se pudieron obtener los archivos de Dropbox', 500);
    }

    const files = responseDropbox.entries.filter(file => file['.tag'] === 'file');

    console.log('Files listed from Dropbox successfully:', files);

    response(res, 200, { message: 'Archivos listados exitosamente', files });
  } catch (error) {
    console.error('Error in listFilesInDropbox:', error);
    if (error.status === 409 && error.error && error.error.error_summary.includes('path/not_found')) {
      res.status(404).json({ error: true, message: 'La ruta especificada no se encontró en Dropbox' });
    } else {
      res.status(400).json({ error: true, message: error.message });
    }
  }
};

// Verificar si la carpeta 'buzonapp' existe en Dropbox
const findFolderInDropbox = async (folderName, currentPath = '') => {
  try {
    const responseDropbox = await dbx.filesListFolder({ path: currentPath });
     // Imprimir la estructura de responseDropbox para depuración
     console.log('responseDropbox:', responseDropbox);

     if (!responseDropbox.entries) {
       throw new Error('La respuesta de Dropbox no contiene la propiedad "entries".');
     }
 

    for (const entry of responseDropbox.entries) {
      if (entry['.tag'] === 'folder') {
        if (entry.name === folderName) {
          return entry.path_display;
        } else {
          // Recursivamente buscar en subcarpetas
          const subFolderPath = await findFolderInDropbox(folderName, entry.path_display);
          if (subFolderPath) {
            return subFolderPath;
          }
        }
      }
    }
  } catch (error) {
    console.error('Error in findFolderInDropbox:', error);
  }

  return null; // La carpeta no fue encontrada
};

const checkFolderExistence = async (req, res) => {
  try {
    const folderName = 'buzonapp';
    const folderPath = await findFolderInDropbox(folderName);

    if (folderPath) {
      response(res, 200, { message: 'Carpeta encontrada', path: folderPath });
    } else {
      response(res, 404, { message: 'Carpeta no encontrada' });
    }
  } catch (error) {
    console.error('Error in checkFolderExistence:', error);
    res.status(500).json({ error: true, message: error.message });
  }
};

// Listar todos los directorios recursivamente desde la carpeta raíz
const listAllDirectories = async (path = '') => {
  try {
    const responseDropbox = await dbx.filesListFolder({ path });
    const directories = [];



    for (const entry of responseDropbox.result.entries) {
      if (entry['.tag'] === 'folder') {
        directories.push(entry.path_display);

        // Recursivamente listar subdirectorios
        const subDirectories = await listAllDirectories(entry.path_display);
        directories.push(...subDirectories);
      }
    }

    return directories;
  } catch (error) {
    console.error('Error in listAllDirectories:', error);
    throw new Error('No se pudo listar los directorios');
  }
};

// Endpoint para listar todos los directorios
const listDirectoriesInDropbox = async (req, res) => {
  try {
    const directories = await listAllDirectories('');
    console.log(directories);
    response(res, 200, { directories });
  } catch (error) {
    console.error('Error in listDirectoriesInDropbox:', error);
    res.status(500).json({ error: true, message: error.message });
  }
};


module.exports = {
  uploadFileToDropbox: catchAsync(uploadFileToDropbox),
  verifyDropboxConnection: catchAsync(verifyDropboxConnection),
  listFilesInDropbox: catchAsync(listFilesInDropbox),
  checkFolderExistence: catchAsync(checkFolderExistence),
  listDirectoriesInDropbox: catchAsync(listDirectoriesInDropbox),
};
