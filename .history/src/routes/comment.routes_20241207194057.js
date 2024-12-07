import express from 'express';
import {
  getCommentsByTaskId,
  addCommentToTask,
  deleteCommentFromTask,
} from '../controllers/comment.controller.js';

const router = express.Router();

router.get('/tasks/:taskId/comments', getCo
    mmentsByTaskId);
router.post('/tasks/:taskId/comments', addCommentToTask);
router.delete('/comments/:id', deleteCommentFromTask);

export default router;