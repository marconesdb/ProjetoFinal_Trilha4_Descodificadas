# 🏢 Sistema de Controle de Estoque IT Support

## 📋 Sobre o Projeto
Sistema web desenvolvido para gerenciamento de estoque de componentes de TI, permitindo controle eficiente de inventário com interface moderna e responsiva.

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
┣ 📂 config/         # Configurações do banco de dados
┣ 📂 controllers/    # Controladores da aplicação
┣ 📂 middleware/
┣ 📂 models/         # Modelos do Sequelize
┣ 📂 routes/  
┣ 📂 seeders/        # Rotas da API
┣ 📜 server.js       # Arquivo principal do servidor
┣ 📜 package.json    # Dependências do projeto
┗ 📜 .env           # Variáveis de ambiente
```

### Frontend
```
📦 frontend/
┣ 📂 src/
┃ ┣ 📂 components/   # Componentes React
┃ ┣ 📂 pages/ 
┃ ┣ 📜 Home.jsx
┃ ┣ 📜 Login.jsx
┃ ┣ 📜 Stock.jsx   
┣ 📂 services/
┃   📜  api.js
┣ 📂 ui/
┣   📜 Alert.jsx
┃     
┃ ┣ 📜 App.jsx      # Componente principal
┃ ┗ 📜 main.jsx     # Ponto de entrada
┣ 📜 index.html
┣ 📜 package.json
┗ 📜 vite.config.js
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
npm start
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


4. Inicie a aplicação Backend:
```bash
node server.js
```

## 🔒 Autenticação do Login
- Email:admin@admin.com
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


