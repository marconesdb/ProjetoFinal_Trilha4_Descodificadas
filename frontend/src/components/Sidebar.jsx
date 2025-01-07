// frontend/src/components/Sidebar.jsx


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
    <div className="w-14 lg:w-64 bg-green-800 text-white h-full fixed left-0 flex flex-col">
      <div className="p-2 lg:p-4">
        <div className="flex flex-col lg:flex-row items-center">
          <img src={logo} alt="IT support" className="h-10 w-10 lg:h-16 lg:w-16" />
          <p className="hidden lg:block ml-4 font-bold text-sm lg:text-base">IT support</p>
        </div>
      </div>
      
      <nav className="mt-6 flex-1">
        <div className="px-2">
          <Link to="/home">
            <div className={`flex items-center justify-center lg:justify-start p-2 text-white hover:bg-green-700 rounded-md ${
              location.pathname === '/home' ? 'bg-green-700' : ''
            }`}>
              <Home className="h-5 w-5 min-w-[1.25rem]" />
              <span className="hidden lg:block ml-2 text-sm">Início</span>
            </div>
          </Link>
          
          <Link to="/stock">
            <div className={`mt-2 flex items-center justify-center lg:justify-start p-2 text-white hover:bg-green-700 rounded-md ${
              location.pathname === '/stock' ? 'bg-green-700' : ''
            }`}>
              <Package className="h-5 w-5 min-w-[1.25rem]" />
              <span className="hidden lg:block ml-2 text-sm">Estoque</span>
            </div>
          </Link>
        </div>
      </nav>

      <div className="p-2">
        <button 
          onClick={handleLogout} 
          className="w-full flex items-center justify-center lg:justify-start p-2 text-white hover:bg-yellow-500 rounded-md transition-colors duration-200"
        >
          <LogOut className="h-5 w-5 min-w-[1.25rem]" />
          <span className="hidden lg:block ml-2 text-sm">Sair</span>
        </button>
      </div>
    </div>
  );
}




