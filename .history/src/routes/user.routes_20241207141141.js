const express = require('express');
const { registerUser, loginUser, getUser, updateUser, deleteUser } = require('../controllers/user.controller');
const { validateRegister, validateLogin, validateUpdate } = require('../validation/validationMiddleware');

const userRouter = express.Router();

userRouter.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);
router.get('/:id', getUser);
router.put('/:id', validateUpdate, updateUser);
router.delete('/:id', deleteUser);

