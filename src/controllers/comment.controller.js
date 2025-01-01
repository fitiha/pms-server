import { PrismaClient } from "@prisma/client";
import createError from "http-errors";

const prisma = new PrismaClient();

// Get all comments (optionally filter by task)
const getAllComments = async (req, res, next) => {
  const { taskId } = req.query; // Optionally filter by task ID
  try {
    const comments = await prisma.comment.findMany({
      where: taskId ? { taskId: parseInt(taskId) } : {},
      include: { task: true, author: true },
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

// Get a specific comment by ID
const getCommentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
      include: { task: true, author: true },
    });
    if (!comment) throw createError(404, "Comment not found");
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

// Create a comment for a task
const createComment = async (req, res, next) => {
  const { taskId, content, userId } = req.body;
  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        task: { connect: { id: parseInt(taskId) } },
        author: { connect: { id: userId } },
      },
    });
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

// Update a comment (edit)
const updateComment = async (req, res, next) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(id) },
      data: { content },
    });
    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
};

// Delete a comment by ID
const deleteComment = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.comment.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Get all comments for a specific task
const getCommentsByTaskId = async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: { taskId: parseInt(taskId) },
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

// Delete a comment from a task
const deleteCommentFromTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.comment.delete({ where: { id: parseInt(id) } });
    res.status(204).send("Comment deleted from task");
  } catch (error) {
    next(error);
  }
};

export {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  getCommentsByTaskId,
  deleteCommentFromTask,
};
