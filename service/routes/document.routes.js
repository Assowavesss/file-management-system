const express = require('express');
const upload = require('../middlewares/fileUpload');
const documentController = require('../controllers/document.controller');

const router = express.Router();

// Route pour télécharger un fichier
router.post('/upload', upload.single('file'), documentController.uploadFile);

// Route pour obtenir la liste de tous les fichiers
router.get('/allfiles', documentController.getAllFiles);

// Route pour télécharger un fichier spécifique par son nom
router.get('/download/:fileName', documentController.downloadFile);

module.exports = router;
