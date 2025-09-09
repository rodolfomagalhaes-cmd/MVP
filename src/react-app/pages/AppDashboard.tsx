import { useState, useEffect } from 'react';
import Layout from '@/react-app/components/Layout';
import { 
  Play, 
  Eye, 
  Upload, 
  Server, 
  Database, 
  Users, 
  Package, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Loader2,
  ExternalLink,
  Settings,
  BarChart3
} from 'lucide-react';

interface AppStats {
  totalUsers: number;
  totalItems: number;
  totalReservations: number;
  totalCondominiums: number;
}

export default function AppDashboard() {
  const [stats, setStats] = useState<AppStats>({
    totalUsers: 0,
    totalItems: 0,
    totalReservations: 0,
    totalCondominiums: 0
  });
  const [loading, setLoading] = useState(true);
  const [deployStatus, setDeployStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [buildStatus, setBuildStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [condos, residents, items, reservations] = await Promise.all([
        fetch('/api/condominiums').then(r => r.json()),
        fetch('/api/residents/stats').then(r => r.ok ? r.json() : []),
        fetch('/api/items').then(r => r.json()),
        fetch('/api/reservations/stats').then(r => r.ok ? r.json() : [])
      ]);

      setStats({
        totalCondominiums: condos.length || 0,
        totalUsers: residents.length || 0,
        totalItems: items.length || 0,
        totalReservations: reservations.length || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    window.open(window.location.origin, '_blank');
  };

  const handleBuild = async () => {
    setBuildStatus('loading');
    try {
      // Simulate build process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setBuildStatus('success');
      setTimeout(() => setBuildStatus('idle'), 3000);
    } catch (error) {
      setBuildStatus('error');
      setTimeout(() => setBuildStatus('idle'), 3000);
    }
  };

  const handleDeploy = async () => {
    setDeployStatus('loading');
    try {
      // Simulate deploy process
      await new Promise(resolve => setTimeout(resolve, 3000));
      setDeployStatus('success');
      setTimeout(() => setDeployStatus('idle'), 5000);
    } catch (error) {
      setDeployStatus('error');
      setTimeout(() => setDeployStatus('idle'), 3000);
    }
  };

  const ActionButton = ({ 
    icon: Icon, 
    label, 
    description, 
    onClick, 
    status, 
    variant = 'primary' 
  }: {
    icon: any;
    label: string;
    description: string;
    onClick: () => void;
    status: 'idle' | 'loading' | 'success' | 'error';
    variant?: 'primary' | 'secondary' | 'success';
  }) => {
    const getButtonStyles = () => {
      if (status === 'loading') return 'bg-gray-400 cursor-not-allowed';
      if (status === 'success') return 'bg-green-500 hover:bg-green-600';
      if (status === 'error') return 'bg-red-500 hover:bg-red-600';
      
      switch (variant) {
        case 'secondary':
          return 'bg-gray-600 hover:bg-gray-700';
        case 'success':
          return 'bg-emerald-500 hover:bg-emerald-600';
        default:
          return 'bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600';
      }
    };

    const getIcon = () => {
      if (status === 'loading') return <Loader2 className="w-6 h-6 animate-spin" />;
      if (status === 'success') return <CheckCircle className="w-6 h-6" />;
      if (status === 'error') return <AlertCircle className="w-6 h-6" />;
      return <Icon className="w-6 h-6" />;
    };

    return (
      <button
        onClick={onClick}
        disabled={status === 'loading'}
        className={`${getButtonStyles()} text-white p-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:hover:scale-100`}
      >
        <div className="flex flex-col items-center space-y-3">
          {getIcon()}
          <div className="text-center">
            <h3 className="font-semibold text-lg">{label}</h3>
            <p className="text-sm opacity-90">{description}</p>
          </div>
        </div>
      </button>
    );
  };

  const StatCard = ({ icon: Icon, label, value, color }: {
    icon: any;
    label: string;
    value: number;
    color: string;
  }) => (
    <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <p className="text-gray-600 text-sm">{label}</p>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard do App</h1>
          <p className="text-gray-600">
            Gerencie, visualize e faça deploy da sua aplicação COMPARTILHAÍ
          </p>
        </div>

        {/* App Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Users}
            label="Moradores"
            value={stats.totalUsers}
            color="bg-blue-500"
          />
          <StatCard
            icon={Package}
            label="Itens"
            value={stats.totalItems}
            color="bg-emerald-500"
          />
          <StatCard
            icon={Calendar}
            label="Reservas"
            value={stats.totalReservations}
            color="bg-purple-500"
          />
          <StatCard
            icon={Server}
            label="Condomínios"
            value={stats.totalCondominiums}
            color="bg-orange-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/20">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Ações da Aplicação
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ActionButton
              icon={Eye}
              label="Preview"
              description="Visualizar aplicação"
              onClick={handlePreview}
              status="idle"
              variant="secondary"
            />
            
            <ActionButton
              icon={Play}
              label="Build"
              description="Compilar projeto"
              onClick={handleBuild}
              status={buildStatus}
              variant="primary"
            />
            
            <ActionButton
              icon={Upload}
              label="Deploy"
              description="Publicar online"
              onClick={handleDeploy}
              status={deployStatus}
              variant="success"
            />
          </div>
        </div>

        {/* App Status */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Database className="w-5 h-5 mr-2" />
            Status da Aplicação
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Servidor</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 text-sm font-medium">Online</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Banco de Dados</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 text-sm font-medium">Conectado</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Autenticação</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 text-sm font-medium">Ativa</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Ambiente</span>
                <span className="text-blue-600 text-sm font-medium">Desenvolvimento</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Versão</span>
                <span className="text-gray-900 text-sm font-medium">1.0.0</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Última Atualização</span>
                <span className="text-gray-900 text-sm font-medium">Agora</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Ações Rápidas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => window.open('/', '_blank')}
              className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <ExternalLink className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900 font-medium">Abrir App</span>
              </div>
              <span className="text-gray-500 text-sm">Nova aba</span>
            </button>
            
            <button
              onClick={fetchStats}
              className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900 font-medium">Atualizar Stats</span>
              </div>
              {loading && <Loader2 className="w-4 h-4 animate-spin text-gray-500" />}
            </button>
          </div>
        </div>

        {/* Deploy Instructions */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
          <h3 className="text-emerald-800 font-semibold mb-3">Instruções de Deploy</h3>
          <div className="space-y-2 text-emerald-700 text-sm">
            <p><strong>Local:</strong> Execute `npm run dev` para desenvolvimento local</p>
            <p><strong>Build:</strong> Execute `npm run build` para compilar o projeto</p>
            <p><strong>Deploy:</strong> Configure Cloudflare e execute `wrangler deploy`</p>
            <p><strong>Acesso:</strong> A aplicação estará disponível na URL fornecida pelo Cloudflare</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
