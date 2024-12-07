const express = require('express');
const { registerUser, loginUser, getUser, updateUser, deleteUser } = require('../controllers/user.controller');
const { validateRegister, validateLogin, validateUpdate } = require('../validation/validationMiddleware');

const userRouter = express.Router();

userRouter.post('/register', validateRegister, registerUser);
userRouter.post('/login', validateLogin, loginUser);
userRouter.get('/:id', getUser);
userRouter.put('/:id', validateUpdate, updateUser);
userRouter.delete('/:id', deleteUser);

export default