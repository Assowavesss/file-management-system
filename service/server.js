const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

require('dotenv').config();

// Créez une nouvelle instance de Prisma Client
const prisma = new PrismaClient();

const middlewares = require('./middlewares/errorMiddleware.js');
const api = require('./routes/index.routes');
const internshipRoutes = require('./routes/internship.routes');
const documentRoutes = require('./routes/document.routes');
const loginRoutes =require('./routes/login.routes.js')



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
app.use('/api/v1/document', documentRoutes);
app.use('/api/v1/download/:fileName', documentRoutes);
app.use('/api/v1/login', loginRoutes)

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 8080;

// Connectez-vous à la base de données via Prisma Client
prisma.$connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on: http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

module.exports = app;
