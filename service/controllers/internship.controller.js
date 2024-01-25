// const { Internship, Company } = require('../models');
// const jwt = require('jsonwebtoken');
// const jwtConfig = require('../config/jwt.config');

// const createInternship = async (req, res) => {
//   try {
//     const token = req.headers.authorization;
//     if (!token) {
//       return res.status(401).json({ error: 'Missing authentication token.' });
//     }

//     const decodedToken = jwt.verify(token, jwtConfig.secret);
//     const userId = decodedToken.userId;

//     const [company] = await Company.findOrCreate({
//       where: { name: req.body.companyName },
//       defaults: {
//         address: req.body.companyAddress,
//         city: req.body.companyCity, // Ajoutez le champ city ici
//         tutorName: req.body.companyTutorName, // Ajoutez le champ tutorName ici
//         tutorEmail: req.body.companyTutorEmail, // Ajoutez le champ tutorEmail ici
//       },
//     });

//     const internship = await Internship.create({
//       title: req.body.internshipTitle,
//       description: req.body.internshipDescription,
//       startDate: req.body.internshipStartDate,
//       endDate: req.body.internshipEndDate,
//       salary: req.body.internshipSalary,
//       CompanyId: company.id,
//       UserId: userId, // Utilisez l'ID de l'utilisateur décodé
//     });

//     res.status(201).json(internship);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// };

// module.exports = {
//   createInternship,
// };
// createInternship.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createInternship = async (req, res) => {
  try {
    // Trouver ou créer l'entreprise associée au stage
    let company = await prisma.company.findUnique({
      where: { name: req.body.companyName },
    });

    if (!company) {
      company = await prisma.company.create({
        data: {
          name: req.body.companyName,
          // Ajoutez les autres champs de l'entreprise si nécessaire
        },
      });
    }

    // Trouver ou créer le tuteur associé au stage
    let tutor = await prisma.tutor.findUnique({
      where: { email: req.body.companyTutorEmail },
    });

    if (!tutor) {
      tutor = await prisma.tutor.create({
        data: {
          name: req.body.companyTutorName,
          email: req.body.companyTutorEmail,
          // Ajoutez les autres champs du tuteur si nécessaire
        },
      });
    }

    // Créer le stage avec l'entreprise et le tuteur associés
    const internship = await prisma.internship.create({
      data: {
        title: req.body.internshipTitle,
        description: req.body.internshipDescription,
        startDate: new Date(req.body.internshipStartDate),
        endDate: new Date(req.body.internshipEndDate),
        salary: req.body.internshipSalary,
        company: { connect: { id: company.id } },
        tutor: { connect: { id: tutor.id } }, // Supposons qu'il y ait un champ tutor relié dans le modèle Internship
      },
    });

    res.status(201).json(internship);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = {
  createInternship,
};

