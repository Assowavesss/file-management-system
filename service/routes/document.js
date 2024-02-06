import express from 'express';
import documentController from '../controllers/document.js';
import upload from '../middlewares/fileUpload.js';

const router = express.Router();

// Route pour télécharger un fichier
router.post('/upload/:internshipId', upload.single('file'), documentController.uploadFile);

// Route pour obtenir la liste de tous les fichiers
router.get('/allfiles/:internshipId', documentController.getAllFiles);

// Route pour télécharger un fichier spécifique par son nom
router.get('/download/:fileName', documentController.downloadFile);

export default router;
