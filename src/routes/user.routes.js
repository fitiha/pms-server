import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  getUserProjects,
  getUserOwnedProjects,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import {
  validateRegister,
  validateLogin,
  validateUpdate,
} from "../validation/userValidation.js";

const router = express.Router();

// User routes
router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.get("/", getUsers); // Get all users
router.get("/:id", getUser); // Get specific user by ID
router.get("/:id/projects", getUserProjects); // Get projects a user is a member of
router.get("/:id/owned-projects", getUserOwnedProjects); // Get projects owned by a user
router.put("/:id", validateUpdate, updateUser);
router.delete("/:id", deleteUser);

export default router;
