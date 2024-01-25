// loginUser.js
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userWithEmail = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!userWithEmail) {
      return res
        .status(400)
        .json({ message: 'Email or password does not match!' });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      userWithEmail.password
    );
    
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ message: 'Email or password does not match!' });
    }

    const jwtToken = jwt.sign(
      { id: userWithEmail.id, email: userWithEmail.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' } // Optionnel, spécifie quand le token expire
    );

    res.json({ message: 'Welcome Back!', token: jwtToken });
  } catch (err) {
    console.error('Error: ', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = {
  loginUser,
};
