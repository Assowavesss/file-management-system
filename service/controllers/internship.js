import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const createInternship = async (req, res) => {
  try {
    console.log('Extracted JWT token:', req.headers.authorization.split(' ')[1]);
    console.log('Request Body:', req.body);
    
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const studentId = decoded.id;

    // Trouver ou créer l'entreprise associée au stage
    let company = await prisma.company.findUnique({
      where: { name: req.body.companyName },
    });

    if (!company) {
      // Créer une nouvelle entreprise
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
    let tutor;
    try {
      tutor = await prisma.tutor.upsert({
        where: { userId },
        update: tutorData,
        create: { userId, ...tutorData },
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create or update tutor' });
    }
    if (!tutor && user) {
      // Créer le tuteur associé à l'utilisateur
      tutor = await prisma.tutor.create({
        data: {
          userId: user.id,
          // Ajoutez d'autres champs si nécessaire
        },
      });
    }

    if (!tutor) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('12345678', salt);
      // Créer un nouvel utilisateur avec un mot de passe par défaut
      user = await prisma.user.create({
        data: {
          firstName: req.body.companyTutorFirstName,
          lastName: req.body.companyTutorLastName,
          email: req.body.companyTutorEmail,
          password: hashedPassword,
          role: 'Enterprise Tutor',
        },
      });

      // Créer le tuteur associé à l'utilisateur
      tutor = await prisma.tutor.create({
        data: {
          userId: user.id,
          // Ajoutez d'autres champs si nécessaire
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
        companyId: company.id,
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

export { createInternship,getAllInternships };
