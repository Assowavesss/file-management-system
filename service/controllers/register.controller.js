// registerUser.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

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
