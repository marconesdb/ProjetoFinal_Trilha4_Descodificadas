// backend/routes/components.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const componentsController = require('../controllers/componentsController');

router.post('/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === 'admin@admin.com' && password === 'admin123') {
      const token = jwt.sign(
        { email, name: 'Administrador' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      return res.json({
        token,
        name: 'Administrador',
        email: email
      });
    }
    return res.status(401).json({ message: 'Credenciais inválidas' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
});

router.get('/components', componentsController.getAll);
router.post('/components', componentsController.create);
router.put('/components/:id', componentsController.update);
router.delete('/components/:id', componentsController.delete);

module.exports = router;