// backend/models/Component.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuma que você tem o arquivo de configuração do sequelize

const Component = sequelize.define('Component', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Define id como PRIMARY KEY
    autoIncrement: true, // Gera ID automaticamente
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Evita duplicação no campo code
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false, // Remove createdAt e updatedAt se não for necessário
});

module.exports = Component;