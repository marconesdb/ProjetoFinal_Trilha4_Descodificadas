//backend/controllers/authControlller.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Buscar usuário
      const user = await User.findOne({ where: { email, active: true } });
      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      // Verificar senha
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      // Gerar token
      const token = jwt.sign(
        { 
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );

      return res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Erro interno no servidor' });
    }
  },

  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;

      // Verificar se email já existe
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email já cadastrado' });
      }

      // Criar usuário
      const user = await User.create({
        name,
        email,
        password,
        role: role || 'user'
      });

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      });
    } catch (error) {
      console.error('Register error:', error);
      return res.status(500).json({ message: 'Erro ao criar usuário' });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password, role, active } = req.body;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      // Atualizar dados
      if (name) user.name = name;
      if (email) user.email = email;
      if (password) user.password = password;
      if (role) user.role = role;
      if (active !== undefined) user.active = active;

      await user.save();

      return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        active: user.active
      });
    } catch (error) {
      console.error('Update user error:', error);
      return res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
  },

  async listUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'role', 'active', 'createdAt']
      });
      return res.json(users);
    } catch (error) {
      console.error('List users error:', error);
      return res.status(500).json({ message: 'Erro ao listar usuários' });
    }
  }
};
