const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const componentController = require('../controllers/componentController');
const authMiddleware = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Auth routes
router.post('/users', [authMiddleware, adminAuth], authController.register);
router.get('/users', [authMiddleware, adminAuth], authController.listUsers);

// Component routes
router.get('/components', authMiddleware, componentController.getAll);
router.post('/components', [authMiddleware, adminAuth], componentController.create);
router.put('/components/:id', [authMiddleware, adminAuth], componentController.update);
router.delete('/components/:id', [authMiddleware, adminAuth], componentController.delete);

module.exports = router;