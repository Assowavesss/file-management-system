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

    const body = req.body;

    const isTutor = await prisma.tutor.findUnique({
      where: {
        userId: studentId,
      },
    });
    
    if(isTutor) {
      return res.status(404).json({message: "You're not a student"});
    }

    // Trouver ou créer l'entreprise associée au stage
    const company = await prisma.company.upsert({
      create: { name: body.companyName },
      where: { name: body.companyName },
      update: { name: body.companyName}
    });
    

    console.log((await prisma.tutor.findMany()));

    const userTutor = await prisma.user.findUnique({
      where: {
        email: body.companyTutorEmail,
        role: "Tutor"
      },
    });

    const tutor = await prisma.tutor.findUnique({
      where: {
        userId: userTutor.id
      }
    });

    const student = await prisma.student.findUnique({
      where: {
        userId: studentId
      },
    });


    console.log(studentId);
    const internship = await prisma.internship.create({
      data: {
        title: req.body.internshipTitle,
        description: req.body.internshipDescription,
        startDate: new Date(req.body.internshipStartDate),
        endDate: new Date(req.body.internshipEndDate),
        salary: parseInt(req.body.internshipSalary, 10),
        companyId: company.id,
        tutorId: tutor.id,
        studentId: student.id,
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
