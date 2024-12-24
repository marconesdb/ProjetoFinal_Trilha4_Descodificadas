import { useEffect, useState } from 'react';
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

  const fetchComponents = async () => {
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
  };

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
  }, []);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <h1 className="text-xl">Componentes / Estoque</h1>
        </div>
        <div className="flex items-center">
          <span className="text-gray-600 mr-2">{localStorage.getItem('userName')}</span>
          <span className="text-gray-400 text-sm">{localStorage.getItem('userEmail')}</span>
        </div>
      </div>

      {alert.show && (
        <Alert type={alert.type}>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}

      <div className="bg-white rounded-lg shadow p-6 ">
        <div className="flex mb-6">
          <div className="relative w-96">
            <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Pesquisar"
              className="w-full p-2 border rounded pl-10 bg-gray-50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && fetchComponents()}
            />
          </div>

          <button
            onClick={fetchComponents}
            className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-600 font-bold inline-flex items-center ml-2"
          >
            <Filter className="h-4 w-4 mr-2" />
            {loading ? 'Carregando...' : 'Filtrar'}
          </button>

          <button
            onClick={addComponent}
            className="bg-yellow-500 text-white px-4 py-2 rounded ml-2 hover:bg-yellow-700 font-bold"
          >
            Novo <span className="text-[20px] font-bold">+</span>
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Código</th>
              <th className="text-left p-2">Componente</th>
              <th className="text-left p-2">Estoque</th>
              <th className="text-left p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {components.map((component) => (
              <tr key={component.id} className="border-b">
                <td className="p-2">{component.code}</td>
                <td className="p-2">
                  {editingComponent?.id === component.id ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    component.name
                  )}
                </td>
                <td className="p-2">
                  {editingComponent?.id === component.id ? (
                    <input
                      type="number"
                      value={editForm.stock}
                      onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
                      className="border rounded p-1 w-20"
                    />
                  ) : (
                    component.stock
                  )}
                </td>
                <td className="p-2">
                  {editingComponent?.id === component.id ? (
                    <button
                      onClick={saveEdit}
                      className="text-green-600 hover:text-green-800 mr-2 inline-flex items-center"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Salvar
                    </button>
                  ) : (
                    <button
                      onClick={() => startEditing(component)}
                      className="text-green-600 hover:text-green-800 mr-2 inline-flex items-center"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Editar
                    </button>
                  )}
                  <button
                    onClick={() => deleteComponent(component.id)}
                    className="text-red-600 hover:text-red-800 inline-flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
