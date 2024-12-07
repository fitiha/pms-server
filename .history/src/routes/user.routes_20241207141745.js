import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.j";
import {
  validateRegister,
  validateLogin,
  validateUpdate,
} from "../validation/userValidation";

const userRouter = express.Router();

userRouter.post("/register", validateRegister, registerUser);
userRouter.post("/login", validateLogin, loginUser);
userRouter.get("/:id", getUser);
userRouter.put("/:id", validateUpdate, updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
