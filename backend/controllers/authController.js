//backend/controllers/authControlller.js

// backend/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validação de entrada
      if (!email || !password) {
        return res.status(400).json({ 
          success: false,
          message: 'Email e senha são obrigatórios' 
        });
      }

      // Rate limiting - adicione isso ao topo do arquivo
      const attempts = loginAttempts.get(email) || 0;
      if (attempts >= 5) {
        return res.status(429).json({
          success: false,
          message: 'Muitas tentativas de login. Tente novamente mais tarde.'
        });
      }

      // Busca usuário
      const user = await User.findOne({ 
        where: { email },
        attributes: ['id', 'name', 'email', 'password', 'role', 'lastLogin'] 
      });

      if (!user) {
        incrementLoginAttempts(email);
        return res.status(401).json({
          success: false,
          message: 'Credenciais inválidas'
        });
      }

      // Valida senha
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        incrementLoginAttempts(email);
        return res.status(401).json({
          success: false,
          message: 'Credenciais inválidas'
        });
      }

      // Limpa tentativas de login após sucesso
      loginAttempts.delete(email);

      // Atualiza último login
      await user.update({ lastLogin: new Date() });

      // Gera token JWT com expiração
      const token = jwt.sign(
        { 
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role 
        },
        process.env.JWT_SECRET,
        { 
          expiresIn: process.env.JWT_EXPIRES_IN || '8h',
          algorithm: 'HS256'
        }
      );

      // Remove senha do objeto de resposta
      const { password: _, ...userWithoutPassword } = user.get();

      // Adiciona refresh token
      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        success: true,
        user: userWithoutPassword,
        token,
        refreshToken
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno no servidor'
      });
    }
  }
};

// Controle de tentativas de login
const loginAttempts = new Map();

function incrementLoginAttempts(email) {
  const attempts = loginAttempts.get(email) || 0;
  loginAttempts.set(email, attempts + 1);
  
  // Limpa as tentativas após 30 minutos
  setTimeout(() => loginAttempts.delete(email), 30 * 60 * 1000);
}