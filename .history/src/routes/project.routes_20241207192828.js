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
router.put('/update/:id', updateProject);
router.delete('/delete/:id', deleteProject);
router.post('/add/:id/members', addProjectMembers);
router.delete('/remove/:id/members', removeProjectMembers);

export default router;