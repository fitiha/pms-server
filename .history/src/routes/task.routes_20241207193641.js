import express from 'express';
import {
  getTasksByProjectId,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/';

const router = express.Router();

router.get('/projects/:projectId/tasks', getTasksByProjectId);
router.post('/projects/:projectId/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;