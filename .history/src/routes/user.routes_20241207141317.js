import express from 'express';


const userRouter = express.Router();

userRouter.post('/register', validateRegister, registerUser);
userRouter.post('/login', validateLogin, loginUser);
userRouter.get('/:id', getUser);
userRouter.put('/:id', validateUpdate, updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;