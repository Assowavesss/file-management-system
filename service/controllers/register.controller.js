const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

// Function to determine the user's role based on email
function determineUserRole(email) {
  if (email.includes('@tutorefrei')) {
    return 'Tutor Academic';
  } else if (email.includes('@tutorentreprise')) {
    return 'Tutor Enterprise';
  } else if (email.includes('@efrei.net')) {
    return 'Student';
  } else if (email.includes('@admin.net')) {
    return 'Admin'; // Ajout du rôle "Admin" pour les adresses se terminant par "@admin.net"
  } else {
    // Default role for other cases (e.g., generic user)
    return 'User';
  }
}

const registerUser = async (req, res) => {
  const { username, firstName, lastName, email, password, phone } = req.body;

  try {
    // Vérifiez si l'utilisateur existe déjà avec l'email ou le nom d'utilisateur
    const alreadyExistsUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ],
      },
    });

    if (alreadyExistsUser) {
      return res
        .status(409)
        .json({ message: 'User with the same email or username already exists!' });
    }

    // Determine the role based on the email address
    const role = determineUserRole(email);

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
        phone, // Ce champ est optionnel grâce à l'opérateur `?` dans le schéma
      },
    });

    if (newUser) {
      res.json({ message: 'Thanks for registering' });
    }
  } catch (err) {
    console.error('Error: ', err);
    res.status(500).json({ error: 'Cannot register user at the moment!' });
  }
};

module.exports = {
  registerUser,
};
