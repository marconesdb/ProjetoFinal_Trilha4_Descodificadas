// backend/server.js

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const sequelize = require('./config/database');
const routes = require('./routes/components');

const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

const authMiddleware = (req, res, next) => {
  if (req.path === '/api/auth/login') {
    return next();
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

app.use('/api', routes);
app.use('/api/components', authMiddleware);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
});




