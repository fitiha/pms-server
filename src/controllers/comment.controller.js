import { PrismaClient } from '@prisma/client';
import createError from 'http-errors';

const prisma = new PrismaClient();

// Get all comments for a specific task
const getCommentsByTaskId = async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: { taskId: parseInt(taskId) },
      include: { user: true },
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

// Add a comment to a task
const addCommentToTask = async (req, res, next) => {
  const { taskId } = req.params;
  const { content, userId } = req.body;
  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        task: { connect: { id: parseInt(taskId) } },
        user: { connect: { id: userId } },
      },
    });
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

// Delete a comment from a task
const deleteCommentFromTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.comment.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export {
  getCommentsByTaskId,
  addCommentToTask,
  deleteCommentFromTask,
};