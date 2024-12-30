import express from 'express';
import {
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
} from '../controllers/project.controller.js';

const router = express.Router();

// Routes for projects
router.get('/', getProjectsByStatus); // Handles both all projects and filtered by status
router.get('/:id', getProjectById);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

// Routes for project members
router.post('/:id/members', addProjectMembers);
router.delete('/:id/members', removeProjectMembers);
router.delete('/:id/members/:userId', removeSpecificProjectMember);

// Routes for tasks under a project
router.get('/:id/tasks', getTasksByProjectId);

export default router;
