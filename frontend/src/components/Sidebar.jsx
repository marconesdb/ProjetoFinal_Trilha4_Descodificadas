// src/components/Sidebar.jsx


import { Link, useLocation } from 'react-router-dom';
import { Home, Package, LogOut } from 'lucide-react';
import logo from '../assets/logo.png';

export function Sidebar() {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    window.location.href = '/login';
  };

  return (
    <div className="w-64 bg-green-800 text-white min-h-screen">
      <div className="p-4 items-center flex">
        <img src={logo} alt="IT support" className="m-4 h-16 w-16" />
        <p className="m-4 font-bold">IT support</p>
      </div>
      
      <nav className="mt-8">
        <div className="px-4">
          <Link to="/home">
            <div className={`flex items-center p-2 text-white hover:bg-green-700 rounded-md ${location.pathname === '/home' ? 'bg-green-700' : ''}`}>
              <Home className="h-5 w-5" />
              <span className="ml-2">Início</span>
            </div>
          </Link>
          
          <Link to="/stock">
            <div className={`mt-2 flex items-center p-2 text-white hover:bg-green-700 rounded-md ${location.pathname === '/stock' ? 'bg-green-700' : ''}`}>
              <Package className="h-5 w-5" />
              <span className="ml-2 ">Estoque</span>
            </div>
          </Link>
        </div>
      </nav>

      <div className="absolute bottom-0 p-4 w-64">
        <button 
          onClick={handleLogout} 
          className="flex items-center p-2 text-red-300 hover:text-red-100 hover:bg-red-800 rounded-md w-full transition-colors duration-200"
        >
          <LogOut className="h-5 w-5" />
          <span className="ml-2">Sair</span>
        </button>
      </div>
    </div>
  );
}



