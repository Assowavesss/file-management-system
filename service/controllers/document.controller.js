const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fonction pour télécharger un fichier
const downloadFile = async (req, res) => {
  try {
    const fileName = req.params.fileName;
    if (fileName.includes('..')) {
      return res.status(400).send('Invalid file name.');
    }

    const filePath = path.join(__dirname, 'back', 'uploads', fileName);
    if (!fs.existsSync(filePath)) {
      return res.status(404).send('File not found.');
    }

    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-Type', 'application/octet-stream');

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error during file download:', error);
    res.status(500).send('Error during file download');
  }
};

// Fonction pour uploader un fichier
const uploadFile = async (req, res) => {
  try {
    const documentType = req.body.documentType || req.query.documentType;
    if (
      !documentType ||
      !['CahierDesCharges', 'RapportDeStage'].includes(documentType)
    ) {
      return res.status(400).send('Invalid document type.');
    }

    const originalFileName = req.file.originalname;

    const newDocument = await prisma.document.create({
      data: {
        fileName: originalFileName,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        documentType: documentType,
      },
    });

    if (documentType === 'CahierDesCharges') {
      await prisma.cahierDesChargesMetadata.create({
        data: { documentId: newDocument.id },
      });
    } else if (documentType === 'RapportDeStage') {
      await prisma.rapportDeStageMetadata.create({
        data: { documentId: newDocument.id },
      });
    }

    res.send('File uploaded successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing file');
  }
};

// Fonction pour obtenir la liste de tous les fichiers
const getAllFiles = async (req, res) => {
  try {
    const files = await prisma.document.findMany();
    const fileNames = files.map((file) => file.fileName);
    res.json(fileNames);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving files');
  }
};

module.exports = {
  downloadFile,
  uploadFile,
  getAllFiles,
};
