# 🏢 Sistema de Controle de Estoque IT Support

## 📋 Sobre o Projeto
Sistema web desenvolvido para gerenciamento de estoque de componentes de TI, permitindo controle eficiente de inventário com interface moderna e responsiva.


![Layout para Dispositivos Móveis](/frontend/src/assets/preview-01.png)



![Layout para Desktops](/frontend/src/assets/preview-02.png)

### 🌟 Características Principais
- 🔐 Sistema de autenticação JWT
- 🔍 Busca em tempo real de componentes
- 📊 Gestão completa de estoque (CRUD)
- 💻 Interface responsiva com Tailwind CSS
- 🎨 Design moderno e intuitivo

## 🛠️ Tecnologias Utilizadas

### Backend
- 🟢 Node.js com Express
- 🗃️ MySQL com Sequelize ORM
- 🔑 JWT para autenticação
- ⚡ API RESTful

### Frontend
- ⚛️ React.js
- 🎨 Tailwind CSS
- 📱 Layout responsivo
- 🔄 Axios para requisições HTTP

## 📁 Estrutura do Projeto

### Backend
```
📦 backend/
│   ├── config/ ⚙️
│   │   └── database.js
│   ├── controllers/ 🎮
│   │   └── componentsController.js
│   │   └── authController.js
│   ├── middleware/ ⚙️
│   │   └── admin.js
│   │   └── auth.js
│   ├── models/ 📊
│   │   └── Component.js
│   │   └── User.js
│   ├── seeders/🌱
│   │   └── createAdminUser.js
│   ├── routes/ 🛣️
│   │   └── components.js
│   │   └── auth.js
│   ├── .env 🔒
│   └── server.js 🚀           
```

### Frontend
```
📦 frontend/
├── src/
│   ├── assets/ 🖼️
│   │   └── Logo.png
│   ├── components/ 🧩
│   │   ├── pages/ 📄
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Stock.jsx
│   │   ├── services/ 🔌
│   │   │   └── api.js
│   │   ├── ui/ 🎨
│   │   │   └── Alert.jsx
│   │   ├── PrivateRoute.jsx 🔐
│   │   └── Sidebar.jsx 📊
│   └── App.jsx ⚛️
```

## 💾 Estrutura do Banco de Dados

### Banco de Dados
```sql
-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS inventory;

-- Usar o banco de dados
USE inventory;

-- Criar a tabela de componentes
CREATE TABLE IF NOT EXISTS Components (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    stock INT NOT NULL,
    UNIQUE INDEX code_index (code)
);

-- Dados iniciais de exemplo
INSERT INTO Components (code, name, stock) VALUES
    ('COMP-001', 'Mouse USB', 50),
    ('COMP-002', 'Teclado Wireless', 30),
    ('COMP-003', 'Monitor 24"', 15),
    ('COMP-004', 'Cabo HDMI 2m', 100),
    ('COMP-005', 'SSD 240GB', 25);
```

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js instalado
- MySQL instalado e configurado
- NPM ou Yarn

### Configuração do Backend
1. Entre na pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o arquivo .env:
```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=inventory
DB_PORT=3306
JWT_SECRET=sua_chave_secreta
```

4. Inicie o servidor:
```bash
node server.js
```

### Configuração do Frontend
1. Entre na pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie a aplicação Frontend:
```bash
npm run dev
```


## 🔒 Autenticação do Login
- Email: admin@admin.com
- Senha: admin123

## 🌟 Funcionalidades Principais

### Gestão de Componentes
- ✨ Cadastro de novos componentes
- 📝 Edição de informações
- 🔍 Busca por nome
- 🗑️ Remoção de itens

### Interface do Usuário
- 📱 Design responsivo
- 🎨 Tema personalizado
- 📊 Visualização organizada dos dados
- ⚡ Feedback em tempo real

## 🤝 Contribuições
Contribuições são bem-vindas! Para contribuir:
1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença
Este projeto está sob a licença MIT.

## 👨‍💻 Autor
Marcone S. de Brito
