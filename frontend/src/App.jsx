//frontend/src/App.jsx



import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Stock } from './components/pages/Stock';
import { Home } from './components/pages/Home';
import { Login } from './components/pages/Login';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <div className="flex min-h-screen bg-gray-100">
                <Sidebar />
                <div className="flex-1 ml-14 lg:ml-64">
                  <Home />
                </div>
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/stock"
          element={
            <PrivateRoute>
              <div className="flex min-h-screen bg-gray-100">
                <Sidebar />
                <div className="flex-1 ml-14 lg:ml-64">
                  <Stock />
                </div>
              </div>
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


















