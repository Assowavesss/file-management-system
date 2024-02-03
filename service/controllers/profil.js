import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const updateProfile = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: 'Authorization header is missing' });
    }

    const token = req.headers.authorization.split(' ')[1];
    if (typeof token !== 'string') {
      throw new Error('Token must be a string');
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Retrieve user data from the decoded token
    const { id } = decodedToken;

    // Get the updated values from the request body
    const { firstName, lastName, email, password } = req.body;

    // Create an object with the updated values
    const updatedUser = {
      firstName: firstName ?? null,
      lastName: lastName ?? null,
      email: email ?? null,
    };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedUser.password = hashedPassword;
    }

    // Update the user's profile in the database using Prisma
    const updatedUserProfile = await prisma.user.update({
      where: { id: id },
      data: updatedUser,
    });

    res.json(updatedUserProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};