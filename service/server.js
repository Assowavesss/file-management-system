const express = require('express');
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

const app = express();
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200,
// };

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api);
app.use('/api/v1/internship', internshipRoutes);
app.use('/api/v1/document', documentRoutes);
app.use('/api/v1/download/:fileName', documentRoutes); // Correction ici

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

module.exports =app;
