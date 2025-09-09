import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useDemoAuth as useAuth } from '@/react-app/components/DemoAuthProvider';
import Layout from '@/react-app/components/Layout';
import { Search, Filter, Package, Star, MapPin } from 'lucide-react';
import { Item, ITEM_CATEGORIES } from '@/shared/types';

export default function Home() {
  const { user, isPending } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [resident, setResident] = useState(null);

  useEffect(() => {
    if (!isPending && !user) {
      navigate('/login');
      return;
    }

    if (user) {
      checkResidentProfile();
      fetchItems();
    }
  }, [user, isPending, navigate]);

  const checkResidentProfile = async () => {
    try {
      const response = await fetch('/api/residents/me');
      if (response.ok) {
        const residentData = await response.json();
        setResident(residentData);
      } else if (response.status === 404) {
        navigate('/setup-profile');
      }
    } catch (error) {
      console.error('Error checking resident profile:', error);
    }
  };

  const fetchItems = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);
      
      const response = await fetch(`/api/items?${params}`);
      if (response.ok) {
        const itemsData = await response.json();
        setItems(itemsData);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && resident) {
      fetchItems();
    }
  }, [searchTerm, selectedCategory, user, resident]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin">
          <Package className="w-10 h-10 text-emerald-600" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const categoryOptions = [
    { value: '', label: 'Todas as Categorias' },
    ...ITEM_CATEGORIES.map(cat => ({
      value: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' & ')
    }))
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Descubra itens incríveis no seu condomínio
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Alugue itens dos seus vizinhos ou disponibilize os seus para gerar uma renda extra
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar itens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white min-w-[200px]"
              >
                {categoryOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin">
              <Package className="w-8 h-8 text-emerald-600 mx-auto" />
            </div>
            <p className="text-gray-500 mt-2">Carregando itens...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum item encontrado</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || selectedCategory 
                ? 'Tente ajustar os filtros de busca'
                : 'Seja o primeiro a adicionar um item!'
              }
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item: any) => (
              <Link
                key={item.id}
                to={`/items/${item.id}`}
                className="group bg-white/80 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200 transform hover:scale-105"
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
                    <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center space-x-1 text-sm text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{item.rating_average.toFixed(1)}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-emerald-600">
                      R$ {item.daily_rate.toFixed(2)}/dia
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>Apt {item.apartment_number}</span>
                    </div>
                  </div>

                  <div className="mt-2 text-xs text-gray-500">
                    Por: {item.owner_name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
