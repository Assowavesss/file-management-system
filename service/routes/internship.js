import express from 'express';
import { createInternship, getAllInternships } from '../controllers/internship.js';
import authenticateJWT from '../middlewares/authenticateJWT.js';

const router = express.Router();

router.post('/internship', authenticateJWT, createInternship);
router.get('/internships', authenticateJWT, getAllInternships);

export default router;
