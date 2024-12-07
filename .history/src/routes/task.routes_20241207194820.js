import express from 'express';
import {
  getTasksByProjectId,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/task.controller.js';

const router = express.Router();

router.get('/projects/:projectId/tasks', getTasksByProjectId);
router.post('/projects/:projectId/tasks', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;