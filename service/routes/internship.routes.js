const express = require('express');
const router = express.Router();
const internshipController = require('../controllers/internship.controller');

const authenticateJWT = require('../middlewares/authenticateJWT'); // Middleware d'authentification JWT

// Route pour créer un nouveau stage (protégée par JWT)
router.post(
  '/internship',
  authenticateJWT,
  internshipController.createInternship
);

// Par exemple, pour récupérer la liste des stages:
// router.get('/internships', authenticateJWT, internshipController.getAllInternships);

// Pour récupérer un stage spécifique par son ID:
// router.get('/internship/:id', authenticateJWT, internshipController.getInternshipById);

// Pour mettre à jour un stage:
// router.put('/internship/:id', authenticateJWT, internshipController.updateInternship);

// Pour supprimer un stage:
// router.delete('/internship/:id', authenticateJWT, internshipController.deleteInternship);

module.exports = router;
