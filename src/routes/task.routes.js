import express from "express";
import {
  getTasksByProjectId,
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  assignTask,
  getCommentsByTaskId,
} from "../controllers/task.controller.js";

const router = express.Router();

// Task routes
router.get("/projects/:projectId/tasks", getTasksByProjectId);
router.post("/projects/:projectId/tasks", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/:id/assign", assignTask);
router.get("/:id/comments", getCommentsByTaskId);

export default router;
