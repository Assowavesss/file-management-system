import express from 'express';
import { updateProfile } from '../controllers/profil.js';

const router = express.Router();
router.use(express.json());
router.put('/profile', updateProfile); // Assurez-vous de définir le chemin et la méthode HTTP appropriés

export default router;