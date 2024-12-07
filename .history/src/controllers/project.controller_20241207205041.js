import { PrismaClient } from '@prisma/client';
import createError from 'http-errors';

const prisma = new PrismaClient();

// Get a list of all projects
const getAllProjects = async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany();
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

// Get details of a specific project
const getProjectById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
      include: { owner: true, members: true, tasks: true },
    });
    if (!project) {
      return next(createError(404, 'Project not found'));
    }
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

// Create a new project
const createProject = async (req, res, next) => {
  const { name, description, status, startDate, endDate, ownerId, memberIds } = req.body;
  try {
    const project = await prisma.project.create({
      data: {
        name,
        description,
        status,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        owner: { connect: { id: ownerId } },
        members: memberIds ? { connect: memberIds.map(id => ({ id })) } : undefined,
      },
    });
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

// Update a project's details
const updateProject = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, status, startDate, endDate, memberIds } = req.body;
  try {
    const project = await prisma.project.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        status,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        members: memberIds ? { set: memberIds.map(id => ({ id })) } : undefined,
      },
    });
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

// Delete a project
const deleteProject = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.project.delete({ where: { id: parseInt(id) } });
    res.status(204).json(message:);
  } catch (error) {
    next(error);
  }
};

// Add members to a project
const addProjectMembers = async (req, res, next) => {
  const { id } = req.params;
  const { memberIds } = req.body;
  try {
    const project = await prisma.project.update({
      where: { id: parseInt(id) },
      data: {
        members: { connect: memberIds.map(id => ({ id })) },
      },
    });
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

// Remove members from a project
const removeProjectMembers = async (req, res, next) => {
  const { id } = req.params;
  const { memberIds } = req.body;
  try {
    const project = await prisma.project.update({
      where: { id: parseInt(id) },
      data: {
        members: { disconnect: memberIds.map(id => ({ id })) },
      },
    });
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

export {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addProjectMembers,
  removeProjectMembers,
};