// backend/routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin');

router.post('/login', authController.login);
router.post('/register', authMiddleware, adminMiddleware, authController.register);
router.put('/users/:id', authMiddleware, adminMiddleware, authController.updateUser);
router.get('/users', authMiddleware, adminMiddleware, authController.listUsers);

module.exports = router;
