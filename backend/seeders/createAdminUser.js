
// backend/seeders/createAdminUser.js


const User = require('../models/User');

async function createAdminUser() {
  try {
    const adminUser = await User.create({
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('Usuário admin criado com sucesso:', adminUser.email);
  } catch (error) {
    console.error('Erro ao criar usuário admin:', error);
  }
}

module.exports = createAdminUser;