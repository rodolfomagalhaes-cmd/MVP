import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import Layout from '@/react-app/components/Layout';
import { Package, Star, MapPin, Calendar, MessageCircle, User, ArrowLeft } from 'lucide-react';

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [reservationData, setReservationData] = useState({
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    if (id) {
      fetchItem();
    }
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await fetch(`/api/items/${id}`);
      if (response.ok) {
        const data = await response.json();
        setItem(data);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error fetching item:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!reservationData.start_date || !reservationData.end_date || !item) {
      return 0;
    }
    
    const startDate = new Date(reservationData.start_date);
    const endDate = new Date(reservationData.end_date);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    return Math.max(0, days * item.daily_rate);
  };

  const handleReservation = async () => {
    if (!reservationData.start_date || !reservationData.end_date) {
      alert('Por favor, selecione as datas de início e fim');
      return;
    }

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_id: parseInt(id!),
          start_date: reservationData.start_date,
          end_date: reservationData.end_date,
        }),
      });

      if (response.ok) {
        alert('Reserva criada com sucesso!');
        navigate('/reservations');
      } else {
        const error = await response.json();
        alert(error.error || 'Erro ao criar reserva');
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert('Erro ao criar reserva');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="animate-spin">
            <Package className="w-8 h-8 text-emerald-600 mx-auto" />
          </div>
          <p className="text-gray-500 mt-2">Carregando item...</p>
        </div>
      </Layout>
    );
  }

  if (!item) {
    return null;
  }

  const total = calculateTotal();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Item Image */}
          <div className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-xl overflow-hidden">
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-96 object-cover"
              />
            ) : (
              <div className="w-full h-96 bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center rounded-xl">
                <Package className="w-24 h-24 text-emerald-500" />
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{item.title}</h1>
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-lg font-medium">{item.rating_average.toFixed(1)}</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-emerald-600 mb-4">
                R$ {item.daily_rate.toFixed(2)}/dia
              </p>
              <p className="text-gray-600">{item.description}</p>
            </div>

            {/* Owner Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.owner_name}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    Apartamento {item.apartment_number}
                  </div>
                </div>
              </div>
            </div>

            {/* Rules */}
            {item.rules && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Regras e Observações</h3>
                <p className="text-blue-800 text-sm">{item.rules}</p>
              </div>
            )}
          </div>
        </div>

        {/* Reservation Form */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Fazer Reserva</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Data de Início
              </label>
              <input
                type="date"
                value={reservationData.start_date}
                onChange={(e) => setReservationData(prev => ({ ...prev, start_date: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Data de Devolução
              </label>
              <input
                type="date"
                value={reservationData.end_date}
                onChange={(e) => setReservationData(prev => ({ ...prev, end_date: e.target.value }))}
                min={reservationData.start_date || new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {total > 0 && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-emerald-800 font-medium">Total da Locação</p>
                  <p className="text-emerald-600 text-sm">
                    {Math.ceil((new Date(reservationData.end_date).getTime() - new Date(reservationData.start_date).getTime()) / (1000 * 60 * 60 * 24))} dias × R$ {item.daily_rate.toFixed(2)}
                  </p>
                </div>
                <p className="text-2xl font-bold text-emerald-600">
                  R$ {total.toFixed(2)}
                </p>
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={handleReservation}
              disabled={!reservationData.start_date || !reservationData.end_date}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Reservar Item</span>
            </button>
            
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Conversar</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
