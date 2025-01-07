// backend/controllers/componentsController.js

const { Op } = require('sequelize');
const Component = require('../models/Component');

module.exports = {
  async getAll(req, res) {
    try {
      const { search } = req.query;
      const condition = search ? { where: { name: { [Op.like]: `%${search}%` } } } : {};
      const components = await Component.findAll(condition);
      res.json(components);
    } catch (error) {
      console.error('Erro ao buscar componentes:', error);
      res.status(500).json({ message: 'Erro ao buscar componentes.' });
    }
  },

  async create(req, res) {
    try {
      const { code, name, stock } = req.body;

      // Verifica se o código já existe
      const existingComponent = await Component.findOne({ where: { code } });
      if (existingComponent) {
        return res.status(400).json({ message: 'Código já existe no banco de dados!' });
      }

      // Cria o componente
      const component = await Component.create({ code, name, stock });
      res.status(201).json(component);
    } catch (error) {
      console.error('Erro ao criar componente:', error);
      res.status(500).json({ message: 'Erro ao criar componente.' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, stock } = req.body;  // Pega tanto nome quanto estoque
  
      // Cria um objeto com os campos a serem atualizados
      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (stock !== undefined) updateData.stock = stock;
  
      // Atualiza o componente
      const [updatedRows] = await Component.update(updateData, { where: { id } });
  
      if (updatedRows === 0) {
        return res.status(404).json({ message: 'Componente não encontrado.' });
      }
  
      res.sendStatus(204);
    } catch (error) {
      console.error('Erro ao atualizar componente:', error);
      res.status(500).json({ message: 'Erro ao atualizar componente.' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      // Remove o componente
      const deletedRows = await Component.destroy({ where: { id } });

      if (deletedRows === 0) {
        return res.status(404).json({ message: 'Componente não encontrado.' });
      }

      res.sendStatus(204);
    } catch (error) {
      console.error('Erro ao deletar componente:', error);
      res.status(500).json({ message: 'Erro ao deletar componente.' });
    }
  },
};