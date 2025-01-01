import express from 'express';
import {
  getCommentsByTaskId,
  deleteCommentFromTask,
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} from '../controllers/comment.controller.js';

const router = express.Router();

router.get('/', getAllComments); // Optionally filter by taskId using query
router.post('/', createComment);
router.get('/:id', getCommentById);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

router.get('/tasks/:taskId/comments', getCommentsByTaskId);
router.delete('/tasks/:taskId/comments/:id', deleteCommentFromTask);

export default router;
