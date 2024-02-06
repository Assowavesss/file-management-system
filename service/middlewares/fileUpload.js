import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    
    const subdirectory = `uploads/${req.params.internshipId}`;

    // Vérifier si le répertoire existe, sinon le créer
    if (!fs.existsSync(subdirectory)) {
      fs.mkdirSync(subdirectory, { recursive: true });
    }

    cb(null, subdirectory);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  const filetypes = /doc|docx|zip|pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/zip',
    'application/pdf',
  ].includes(file.mimetype);

  mimetype && extname
    ? cb(null, true)
    : cb(new Error('Erreur : Types de fichiers non autorisés!'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});

export default upload;
