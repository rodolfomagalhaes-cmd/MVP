import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDemoAuth as useAuth } from '@/react-app/components/DemoAuthProvider';
import { Building2, User, Phone, Home } from 'lucide-react';
import { Condominium } from '@/shared/types';

export default function SetupProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [condominiums, setCondominiums] = useState<Condominium[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    condominium_id: '',
    apartment_number: '',
    full_name: user?.google_user_data?.name || '',
    phone: '',
  });

  useEffect(() => {
    fetchCondominiums();
  }, []);

  const fetchCondominiums = async () => {
    try {
      const response = await fetch('/api/condominiums');
      if (response.ok) {
        const data = await response.json();
        setCondominiums(data);
      }
    } catch (error) {
      console.error('Error fetching condominiums:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/residents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          condominium_id: parseInt(formData.condominium_id),
        }),
      });

      if (response.ok) {
        navigate('/');
      } else {
        const error = await response.json();
        alert(error.error || 'Erro ao criar perfil');
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Erro ao criar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete seu Perfil</h1>
          <p className="text-gray-600">
            Para acessar a plataforma, precisamos de algumas informações
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building2 className="w-4 h-4 inline mr-2" />
                Condomínio
              </label>
              <select
                value={formData.condominium_id}
                onChange={(e) => setFormData(prev => ({ ...prev, condominium_id: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Selecione seu condomínio</option>
                {condominiums.map((condo) => (
                  <option key={condo.id} value={condo.id}>
                    {condo.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Home className="w-4 h-4 inline mr-2" />
                Número do Apartamento
              </label>
              <input
                type="text"
                value={formData.apartment_number}
                onChange={(e) => setFormData(prev => ({ ...prev, apartment_number: e.target.value }))}
                placeholder="Ex: 101, 201A, etc."
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Nome Completo
              </label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Telefone (Opcional)
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="(11) 99999-9999"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Criando Perfil...' : 'Completar Perfil'}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Seus dados serão verificados pelo administrador do condomínio
          </p>
        </div>
      </div>
    </div>
  );
}
