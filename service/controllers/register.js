import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { generateToken } from './login.js';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Function to determine the user's role based on email
function roleEqualToEmail(email, role) {
  switch (role) {
    case 'Student':
      return email.endsWith('@efrei.net');
    case 'Tutor Enterprise':
      return email.endsWith('@tutorentreprise.net');
    case 'Admin':
      return email.endsWith('@admin.net');
    default:
      return false;
  }
}

const registerUser = async (req, res) => {
  const { username, firstName, lastName, email, password, role, promotion } = req.body;

  if (!roleEqualToEmail(email, role)) {
    return res.status(400).json({ message: 'Role and email are not' });
  }

  console.log('Extracted JWT token:', req.headers.authorization.split(' ')[1]);
  console.log('Request Body:', req.body);
    
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const adminId = decoded.id;

  try {
    await prisma.$transaction(async (prisma) => {
      const checkAdmin = await prisma.admin.findUnique({
        where: {
          id: adminId,
        },
      });
      
     
      
      const alreadyExistsUser = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { username }],
        },
      });

      if (alreadyExistsUser) {
        return res.status(409).json({
          message: 'User with the same email or username already exists!',
        });
      }

      // Hacher le mot de passe avant de l'enregistrer dans la base de données
      const hashedPassword = await bcrypt.hash(password, 10);

      // Créez un nouvel utilisateur dans la base de données avec Prisma
      const newUser = await prisma.user.create({
        data: {
          username,
          firstName,
          lastName,
          email,
          password: hashedPassword,
          role, // Set the determined role here
        },
      });
      console.log(newUser);
      
      if (role === 'Tutor Enterprise') {
        await prisma.tutor.create({
          data: {
            tutor: {
              create: {
                userId: newUser.id,
              },
            },
          },
        });
      }
      else if (role === 'Student') {
        await prisma.student.create({
          data: {
            userId: newUser.id,
            promotion: promotion,
          },
        });
      }
      else if (role === 'Admin') {
        await prisma.admin.create({
          data: {
            userId: newUser.id,
          },
        });
      }

      if (newUser) {
        res.json({ message: 'Merci pour votre inscription'});
      }
    });
  } catch (error) {
    // Handle the error here
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export { registerUser };
