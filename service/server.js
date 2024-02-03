import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import api from './routes/index.js';
import internshipRoutes from './routes/internship.js';
import documentRoutes from './routes/document.js';
import loginRoutes from './routes/login.js';
import profilRoutes from './routes/profil.js' ;
import { getAllInternships } from './controllers/internship.js';
dotenv.config();
// Créez une nouvelle instance de Prisma Client
const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

// Supposons que vous avez déjà un middleware d'authentification qui stocke les informations de l'utilisateur dans req.user
// Vous devrez adapter cela en fonction de votre méthode d'authentification

// Route API pour récupérer les informations de l'utilisateur connecté
app.get('/api/userInfo', (req, res) => {
  // Vérifiez si l'utilisateur est authentifié (par exemple, en vérifiant la session)
  if (req.user) {
    // Si l'utilisateur est authentifié, renvoyez les informations de l'utilisateur
    res.json(req.user);
  } else {
    // Si l'utilisateur n'est pas authentifié, renvoyez une réponse d'erreur
    res.status(401).json({ message: 'Utilisateur non authentifié' });
  }
});

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api);
app.use('/api/v1/internship', internshipRoutes);
app.use('/api/v1/file', documentRoutes);
app.use('/api/v1/download/:fileName', documentRoutes);
app.use('/api/v1/login', loginRoutes);
app.use('/api/v1/profile', profilRoutes);
app.get('/internships', getAllInternships);


app.use(notFound);
app.use(errorHandler);
app.use(cookieParser());

const port = process.env.PORT || 8080;

// Connectez-vous à la base de données via Prisma Client
prisma
  .$connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on: http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

export default app;
