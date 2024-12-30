import { PrismaClient } from "@prisma/client";
import createError from "http-errors";

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
      return next(createError(404, "Project not found"));
    }
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

// Create a new project
const createProject = async (req, res, next) => {
  const { name, description, status, startDate, endDate, ownerId, memberIds } =
    req.body;
  try {
    const project = await prisma.project.create({
      data: {
        name,
        description,
        status,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        owner: { connect: { id: ownerId } },
        members: memberIds
          ? { connect: memberIds.map((id) => ({ id })) }
          : undefined,
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
        members: memberIds
          ? { set: memberIds.map((id) => ({ id })) }
          : undefined,
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
    res.status(204).json("Project deleted successfully");
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
        members: { connect: memberIds.map((id) => ({ id })) },
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
        members: { disconnect: memberIds.map((id) => ({ id })) },
      },
    });
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

// Get all tasks for a specific project
const getTasksByProjectId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const tasks = await prisma.task.findMany({
      where: { projectId: parseInt(id) },
      include: { assignee: true, comments: true },
    });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};


// Remove a specific member from the project
const removeSpecificProjectMember = async (req, res, next) => {
  const { id, userId } = req.params;
  try {
    const project = await prisma.project.update({
      where: { id: parseInt(id) },
      data: {
        members: { disconnect: { id: parseInt(userId) } },
      },
    });
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

// Get projects filtered by status
const getProjectsByStatus = async (req, res, next) => {
  const { status } = req.query;
  try {
    const projects = await prisma.project.findMany({
      where: status ? { status } : undefined,
    });
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};


// Create a new project (restricted by role)
const createRoleBasedProject = async (req, res, next) => {
  const { name, description, status, startDate, endDate, ownerId, memberIds } =
    req.body;
  try {
    const user = await prisma.user.findUnique({ where: { id: ownerId } });
    if (!user || !["ADMIN", "PROJECT_MANAGER"].includes(user.role)) {
      return next(createError(403, "You do not have permission to create a project"));
    }

    const project = await prisma.project.create({
      data: {
        name,
        description,
        status,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        owner: { connect: { id: ownerId } },
        members: memberIds
          ? { connect: memberIds.map((id) => ({ id })) }
          : undefined,
      },
    });
    res.status(201).json(project);
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
  getTasksByProjectId,
  removeSpecificProjectMember,
  getProjectsByStatus,
  createRoleBasedProject
};

