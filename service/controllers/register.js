import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { generateToken } from './login.js';
const prisma = new PrismaClient();

// Function to determine the user's role based on email
function roleEqualToEmail(email, role) {
  switch (role) {
    case 'Student':
      return email.endsWith('@efrei.net');
    case 'Tutor Academic':
      return email.endsWith('@tutorefrei.net');
    case 'Tutor Enterprise':
      return email.endsWith('@tutorentreprise.net');
    case 'Admin':
      return email.endsWith('@admin.net');
    default:
      return false;
  }
}

const registerUser = async (req, res) => {
  const { username, firstName, lastName, email, password, role } = req.body;

  if (!roleEqualToEmail(email, role)) {
    return res.status(400).json({ message: 'Role and email are not' });
  }

  try {
    await prisma.$transaction(async (prisma) => {
      // Vérifiez si l'utilisateur existe déjà avec l'email ou le nom d'utilisateur
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
      if (role === 'Tutor Academic') {
        await prisma.academicTutor.create({
          data: {
            tutor: {
              create: {
                userId: newUser.id,
              },
            },
          },
        });
      }

      if (role === 'Tutor Enterprise') {
        await prisma.enterpriseTutor.create({
          data: {
            tutor: {
              create: {
                userId: newUser.id,
              },
            },
          },
        });
      }

      if (role === 'Student') {
        await prisma.student.create({
          data: {
            userId: newUser.id,
            promotion: req.body.promotion,
          },
        });
      }

      if (newUser) {
        const jwtToken = generateToken(newUser);
        res.json({ message: 'Merci pour votre inscription', token: jwtToken });
      }
    });
  } catch (error) {
    // Handle the error here
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export { registerUser };
