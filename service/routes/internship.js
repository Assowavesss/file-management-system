import express from 'express';
import { createInternship, getAllInternships } from '../controllers/internship.js';

import authenticateJWT from '../middlewares/authenticateJWT.js';

const router = express.Router();

router.post('/internship', authenticateJWT, createInternship);
router.get('/internships', authenticateJWT, getAllInternships); // Utilisation de getAllInternships pour une autre page

export default router;
