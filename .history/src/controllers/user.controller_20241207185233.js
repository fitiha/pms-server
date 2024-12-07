import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';

const prisma = new PrismaClient();


// Register a new user
const registerUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role
      }
    });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// Login a user
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return next(createError(404, 'User not found'));
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createError(401, 'Invalid password'));
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, secret, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

// Get user details by ID
const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) {
      return next(createError(404, 'User not found'));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Update user details
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        password: hashedPassword,
        role
      }
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Delete a user
const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser
};