import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
const generateToken = (user) => {
  const jwtToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  return jwtToken;
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userWithEmail = await prisma.user.findUnique({
      where: { email , password},
    });
    console.log('aaa');
    if (!userWithEmail) {
      return res
        .status(400)
        .json({ message: 'Email or password does not match!' });
    }
    console.log('aaa');
    
    console.log('aaa');
    const jwtToken = generateToken(userWithEmail);
    res.clearCookie('userToken');
    res.cookie('userToken', jwtToken, { httpOnly: true, secure: true, sameSite: 'none' });
    console.log('aaa');
    res.json({ message: 'Welcome Back!', token: jwtToken });
  } catch (err) {
    console.error('Error: ', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export { loginUser, generateToken };
