import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import { validateRegister, validateLogin, validateUpdate } from './validationMiddleware.js';

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
    next(createError(400, error.message));
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
    const token = jwt.sign({ userId: user.id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    next(createError(400, error.message));
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
    next(createError(400, error.message));
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
    next(createError(400, error.message));
  }
};

// Delete a user
const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    next(createError(400, error.message));
  }
};

export {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser
};