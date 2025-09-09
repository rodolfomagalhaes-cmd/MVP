import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import Layout from '@/react-app/components/Layout';
import { Package, Star, Calendar, Eye } from 'lucide-react';
import { Item } from '@/shared/types';

export default function MyItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyItems();
  }, []);

  const fetchMyItems = async () => {
    try {
      const response = await fetch('/api/my-items');
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="animate-spin">
            <Package className="w-8 h-8 text-emerald-600 mx-auto" />
          </div>
          <p className="text-gray-500 mt-2">Carregando seus itens...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Itens</h1>
            <p className="text-gray-600">Gerencie os itens que você disponibiliza para locação</p>
          </div>
          <Link
            to="/add-item"
            className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
          >
            <Package className="w-5 h-5" />
            <span>Adicionar Item</span>
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum item cadastrado</h3>
            <p className="text-gray-500 mb-6">
              Comece adicionando seu primeiro item para locação
            </p>
            <Link
              to="/add-item"
              className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Package className="w-5 h-5 mr-2" />
              Adicionar Primeiro Item
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white/80 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-white/20"
              >
                <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center">
                      <Package className="w-12 h-12 text-emerald-500" />
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center space-x-1 text-sm text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{item.rating_average.toFixed(1)}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-bold text-emerald-600">
                      R$ {item.daily_rate.toFixed(2)}/dia
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.is_available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.is_available ? 'Disponível' : 'Indisponível'}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Link
                      to={`/items/${item.id}`}
                      className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Ver
                    </Link>
                    <button className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      Reservas
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
