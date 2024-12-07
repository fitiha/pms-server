import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import {
  validateRegister,
  validateLogin,
  validateUpdate,
} from "../validation/userValidation.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.get("/:id", getUser);
router.put("/:id", validateUpdate, updateUser);
router.delete("/:id", deleteUser);

export default router;