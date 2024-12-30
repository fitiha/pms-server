import { PrismaClient } from '@prisma/client';
import createError from 'http-errors';

const prisma = new PrismaClient();

// Get all tasks for a specific project
const getTasksByProjectId = async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const tasks = await prisma.task.findMany({
      where: { projectId: parseInt(projectId) },
      include: { assignee: true, comments: true },
    });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// Create a new task within a project
const createTask = async (req, res, next) => {
  const { projectId } = req.params;
  const { name, description, status, priority, dueDate, assigneeId } = req.body;
  try {
    const task = await prisma.task.create({
      data: {
        name,
        description,
        status,
        priority,
        dueDate: new Date(dueDate),
        project: { connect: { id: parseInt(projectId) } },
        assignee: assigneeId ? { connect: { id: assigneeId } } : undefined,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// Update a task within a project
const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, status, priority, dueDate, assigneeId } = req.body;
  try {
    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        status,
        priority,
        dueDate: new Date(dueDate),
        assignee: assigneeId ? { connect: { id: assigneeId } } : undefined,
      },
    });
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Delete a task within a project
const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Get all tasks (with optional filtering by status, priority, or assignee)
const getAllTasks = async (req, res, next) => {
  const { status, priority, assigneeId } = req.query;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        status: status || undefined,
        priority: priority || undefined,
        assigneeId: assigneeId ? parseInt(assigneeId) : undefined,
      },
      include: { assignee: true, comments: true },
    });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// Get a specific task by ID
const getTaskById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
      include: { assignee: true, comments: true },
    });
    if (!task) {
      throw createError(404, 'Task not found');
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Assign a task to a user
const assignTask = async (req, res, next) => {
  const { id } = req.params;
  const { assigneeId } = req.body;
  try {
    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        assignee: assigneeId ? { connect: { id: assigneeId } } : undefined,
      },
    });
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Get all comments for a specific task
const getCommentsByTaskId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: { taskId: parseInt(id) },
      include: { author: true },
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export {
  getTasksByProjectId,
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  assignTask,
  getCommentsByTaskId,
};

