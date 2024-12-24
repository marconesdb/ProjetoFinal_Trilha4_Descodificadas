//frontend/src/components/pages/Home.jsx

import { useEffect, useState } from 'react';
import api from '../services/api';

export function Home() {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await api.get('/components');
        setComponents(response.data);
      } catch (error) {
        console.error('Erro ao buscar componentes:', error);
      }
    };
    fetchComponents();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-xl mb-6">Lista de Componentes</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Código</th>
              <th className="text-left p-2">Componente</th>
              <th className="text-left p-2">Estoque</th>
            </tr>
          </thead>
          <tbody>
            {components.map((component) => (
              <tr key={component.id} className="border-b">
                <td className="p-2">{component.code}</td>
                <td className="p-2">{component.name}</td>
                <td className="p-2">{component.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



