const express = require('express');
const { registerUser, loginUser, getUser, updateUser, deleteUser } = require('../');
const { validateRegister, validateLogin, validateUpdate } = require('../validation/validationMiddleware');

const router = express.Router();

router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);
router.get('/:id', getUser);
router.put('/:id', validateUpdate, updateUser);
router.delete('/:id', deleteUser);

module.exports = router;