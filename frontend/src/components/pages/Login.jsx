// frontend/src/pages/Login.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import logo from '../../assets/Logo.png'
export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { 
        email: email.trim(), 
        password: password.trim() 
      });
      
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('userName', response.data.name);
      localStorage.setItem('userEmail', response.data.email);
      
      navigate('/stock');
    } catch (error) {
      console.error('Login error:', error);
      alert('Credenciais inválidas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-green-800 p-8 rounded-lg shadow-md w-96">
      <div className="text-center mb-6">
          <img src={logo} alt="Login" className="w-24 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">Faça o Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Senha"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full font-bold bg-white text-green-800 p-2 rounded hover:bg-green-700 hover:text-white"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
