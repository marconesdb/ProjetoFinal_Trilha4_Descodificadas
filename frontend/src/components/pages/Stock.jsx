
// frontend/src/pages/Stock.jsx

import { useEffect, useState, useCallback } from 'react';
import { Save, Trash2, Search, Filter } from 'lucide-react';
import api from '../services/api';
import { Alert, AlertDescription } from '../ui/Alert';

export function Stock() {
  const [components, setComponents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingComponent, setEditingComponent] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    stock: '',
  });
  
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  const fetchComponents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/components', {
        params: { search },
      });
      setComponents(response.data);
    } catch (error) {
      console.error('Erro ao buscar componentes:', error);
      showAlert('Erro ao buscar componentes', 'error');
    } finally {
      setLoading(false);
    }
  }, [search]);

  const showAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  const addComponent = async () => {
    try {
      const name = prompt('Digite o nome do componente:');
      const stock = parseInt(prompt('Digite a quantidade em estoque:')) || 0;

      if (!name) {
        showAlert('O nome do componente é obrigatório.', 'error');
        return;
      }

      const newComponent = {
        code: `COMP-${Date.now()}`,
        name,
        stock,
      };

      await api.post('/components', newComponent);
      showAlert('Componente adicionado com sucesso!');
      await fetchComponents();
    } catch (error) {
      console.error('Erro ao adicionar componente:', error);
      showAlert('Erro ao adicionar componente', 'error');
    }
  };

  const startEditing = (component) => {
    setEditingComponent(component);
    setEditForm({
      name: component.name,
      stock: component.stock.toString(),
    });
  };

  const saveEdit = async () => {
    if (!editingComponent) return;

    if (!editForm.name.trim()) {
      showAlert('O nome do componente não pode estar vazio.', 'error');
      return;
    }

    try {
      await api.put(`/components/${editingComponent.id}`, {
        name: editForm.name,
        stock: parseInt(editForm.stock),
      });
      setEditingComponent(null);
      showAlert('Componente atualizado com sucesso!');
      await fetchComponents();
    } catch (error) {
      console.error('Erro ao editar componente:', error.response?.data || error.message);
      showAlert('Erro ao atualizar componente', 'error');
    }
  };

  const deleteComponent = async (id) => {
    if (!confirm('Confirma a exclusão?')) return;

    try {
      await api.delete(`/components/${id}`);
      showAlert('Componente deletado com sucesso!');
      await fetchComponents();
    } catch (error) {
      console.error('Erro ao deletar componente:', error);
      showAlert('Erro ao deletar componente', 'error');
    }
  };

  useEffect(() => {
    fetchComponents();
  }, [fetchComponents]);

  return (
    <div className="w-full  h-full min-h-screen p-2 lg:p-8 bg-gray-100">
    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 space-y-2 lg:space-y-0">
      <div className="flex items-center">
        <h1 className="text-base lg:text-xl">Componentes / Estoque</h1>
      </div>
      <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-1 lg:space-y-0 lg:space-x-2">
        <span className="text-sm lg:text-base text-gray-600">{localStorage.getItem('userName')}</span>
        <span className="text-xs lg:text-sm text-gray-400">{localStorage.getItem('userEmail')}</span>
      </div>
    </div>

    {alert.show && (
      <Alert type={alert.type}>
        <AlertDescription>{alert.message}</AlertDescription>
      </Alert>
    )}

    <div className="bg-white rounded-lg shadow-md p-3 lg:p-6">
      <div className="flex flex-col space-y-3 lg:flex-row lg:space-y-0 lg:space-x-4 mb-4">
        <div className="flex-1 lg:max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Pesquisar"
              className="w-full pl-10 pr-3 py-2 text-sm border rounded-md bg-gray-50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && fetchComponents()}
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={fetchComponents}
            className="px-3 py-2 text-sm bg-green-800 text-white rounded-md hover:bg-green-700 flex items-center"
          >
            <Filter className="h-4 w-4 mr-2" />
            {loading ? 'Carregando...' : 'Filtrar'}
          </button>
          <button
            onClick={addComponent}
            className="px-3 py-2 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600 flex items-center"
          >
            Novo <span className="ml-1 text-base">+</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto -mx-3 lg:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 py-2 text-left text-xs lg:text-sm font-medium text-gray-500">Código</th>
                  <th scope="col" className="px-3 py-2 text-left text-xs lg:text-sm font-medium text-gray-500">Componente</th>
                  <th scope="col" className="px-3 py-2 text-left text-xs lg:text-sm font-medium text-gray-500">Estoque</th>
                  <th scope="col" className="px-3 py-2 text-left text-xs lg:text-sm font-medium text-gray-500">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {components.map((component) => (
                  <tr key={component.id}>
                    <td className="px-3 py-2 text-xs lg:text-sm text-gray-900 whitespace-nowrap">{component.code}</td>
                    <td className="px-3 py-2 text-xs lg:text-sm text-gray-900">
                      {editingComponent?.id === component.id ? (
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-2 py-1 text-xs lg:text-sm border rounded"
                        />
                      ) : (
                        component.name
                      )}
                    </td>
                    <td className="px-3 py-2 text-xs lg:text-sm text-gray-900">
                      {editingComponent?.id === component.id ? (
                        <input
                          type="number"
                          value={editForm.stock}
                          onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
                          className="w-20 px-2 py-1 text-xs lg:text-sm border rounded"
                        />
                      ) : (
                        component.stock
                      )}
                    </td>
                    <td className="px-3 py-2 text-xs lg:text-sm whitespace-nowrap">
                      <div className="flex space-x-2">
                        {editingComponent?.id === component.id ? (
                          <button
                            onClick={saveEdit}
                            className="text-green-600 hover:text-green-800 flex items-center"
                          >
                            <Save className="h-4 w-4 mr-1" />
                            <span className="text-xs lg:text-sm">Salvar</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => startEditing(component)}
                            className="text-green-600 hover:text-green-800 flex items-center"
                          >
                            <Save className="h-4 w-4 mr-1" />
                            <span className="text-xs lg:text-sm">Editar</span>
                          </button>
                        )}
                        <button
                          onClick={() => deleteComponent(component.id)}
                          className="text-red-600 hover:text-red-800 flex items-center"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          <span className="text-xs lg:text-sm">Deletar</span>
                        </button>
                      </div>
                    </td>
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