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
router.put('//:id', updateProject);
router.delete('/delete/:id', deleteProject);
router.post('/members/add/:id', addProjectMembers);
router.delete('/members/remove/:id', removeProjectMembers);

export default router;