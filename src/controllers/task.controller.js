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

export {
  getTasksByProjectId,
  createTask,
  updateTask,
  deleteTask,
};