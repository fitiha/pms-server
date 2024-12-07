import express from 'express';
import {
  getCommentsByTaskId,
  addCommentToTask,
  deleteCommentFromTask,
} from './comment.controller.js';

const router = express.Router();

router.get('/tasks/:taskId/comments', getCommentsByTaskId);
router.post('/tasks/:taskId/comments', addCommentToTask);
router.delete('/comments/:id', deleteCommentFromTask);

export default router;