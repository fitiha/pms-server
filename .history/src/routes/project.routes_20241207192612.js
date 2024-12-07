import express from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addProjectMembers,
  removeProjectMembers,
} from '../controllers/project.controller.js';

const router = express.Router();

router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/create', createProject);
router.put('/:id', updateProject);
router.delete('/projects/:id', deleteProject);
router.post('/projects/:id/members', addProjectMembers);
router.delete('/projects/:id/members', removeProjectMembers);

export default router;