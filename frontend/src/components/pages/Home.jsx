// src/components/pages/Home.jsx
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
    <div className="w-full p-2 lg:p-8">
      <h1 className="text-base lg:text-xl mb-4">Lista de Componentes</h1>
      <div className="bg-white rounded-lg shadow-md p-3 lg:p-6">
        <div className="overflow-x-auto -mx-3 lg:mx-0">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-2 text-left text-xs lg:text-sm font-medium text-gray-500">Código</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs lg:text-sm font-medium text-gray-500">Componente</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs lg:text-sm font-medium text-gray-500">Estoque</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {components.map((component) => (
                    <tr key={component.id}>
                      <td className="px-3 py-2 text-xs lg:text-sm text-gray-900 whitespace-nowrap">{component.code}</td>
                      <td className="px-3 py-2 text-xs lg:text-sm text-gray-900">{component.name}</td>
                      <td className="px-3 py-2 text-xs lg:text-sm text-gray-900">{component.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

