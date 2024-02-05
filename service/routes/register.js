import express from 'express';
import { registerUser } from '../controllers/register.js';
import authenticateJWT from '../middlewares/authenticateJWT.js';

const router = express.Router();

router.post('/register', authenticateJWT, registerUser);

export default router;
