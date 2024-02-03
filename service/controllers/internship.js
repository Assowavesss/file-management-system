import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const createInternship = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const studentId = decoded.id;
    // Trouver ou créer l'entreprise associée au stage
    let company = await prisma.company.findUnique({
      where: { name: req.body.companyName },
    });

    if (!company) {
      company = await prisma.company.create({
        data: {
          name: req.body.companyName,
        },
      });
    }

    // Trouver l'utilisateur associé au tuteur
    let user = await prisma.user.findUnique({
      where: { email: req.body.companyTutorEmail },
    });

    // Trouver ou créer le tuteur associé à l'utilisateur
    let tutor = null;
    if (user) {
      tutor = await prisma.tutor.findUnique({
        where: { userId: user.id },
      });
    }
    if (!tutor && user) {
      // Créer le tuteur associé à l'utilisateur
      tutor = await prisma.tutor.create({
        data: {
          userId: user.id,
          // Ajoutez d'autres champs si nécessaire
        },});
      }

    if (!tutor) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('12345678', salt);
      // Créer un nouvel utilisateur avec un mot de passe par défaut
      const user = await prisma.user.create({
        data: {
          firstName: req.body.companyTutorFirstName, // Utilisez le bon champ pour le prénom du tuteur
          lastName: req.body.companyTutorLastName, // Utilisez le bon champ pour le nom du tuteur
          email: req.body.companyTutorEmail,
          password: hashedPassword, // Remplacez ceci par le mot de passe par défaut que vous voulez
          role: 'Enterprise Tutor',
        },
      });

      // Créer le tuteur associé à l'utilisateur
      tutor = await prisma.tutor.create({
        data: {
          name: req.body.companyTutorName,
          email: req.body.companyTutorEmail,
          userId: user.id,
          tutorId: user.id.toString(),
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
        salary: parseInt(req.body.internshipSalary, 10),
        companyId: company.id, // Utilisez le bon champ pour l'ID de l'entreprise
        tutorId: tutor.id,
        studentId: studentId,
      },
    });

    res.status(201).json(internship);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
  
};
const getAllInternships = async (req, res) => {
  try {
    // Récupérer la liste de toutes les internships depuis la base de données
    const internships = await prisma.internship.findMany();

    // Envoyer la liste en réponse sous forme de JSON
    res.status(200).json(internships);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};

export { createInternship, getAllInternships};
