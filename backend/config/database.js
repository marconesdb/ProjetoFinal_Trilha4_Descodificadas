// backend/config/database.js

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
  }
);

sequelize
  .authenticate()
  .then(() => console.log('Conexão bem-sucedida com o banco de dados.'))
  .catch((err) => console.error('Erro ao conectar ao banco de dados:', err));

module.exports = sequelize;


