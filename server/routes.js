const express = require('express');
const UserController = require('./controllers/UserController');

const router = express.Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.post('/logout', UserController.logoutUser);
router.put('/profile/:userId', UserController.updateProfile);
router.put('/change-password/:userId', UserController.changePassword);
router.delete('/account/:id', UserController.deleteAccount);

module.exports = router;
