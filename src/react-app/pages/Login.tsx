import { useDemoAuth as useAuth } from '@/react-app/components/DemoAuthProvider';
import DemoUserSelector from '@/react-app/components/DemoUserSelector';
import { Shield, Users, Package, Star } from 'lucide-react';

export default function Login() {
  const { redirectToLogin } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">C</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
            COMPARTILHAÍ
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A plataforma de locação de itens exclusiva para condomínios residenciais
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Features */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Segurança Garantida</h3>
                <p className="text-gray-600">Acesso exclusivo para moradores verificados do seu condomínio</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Comunidade Conectada</h3>
                <p className="text-gray-600">Conheça seus vizinhos e fortaleça os laços da comunidade</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Renda Extra</h3>
                <p className="text-gray-600">Monetize itens que você pouco usa e gere uma renda adicional</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Sistema de Avaliações</h3>
                <p className="text-gray-600">Reputação transparente para transações seguras</p>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Bem-vindo!</h2>
              <p className="text-gray-600 mb-6">
                Versão de demonstração - Teste todas as funcionalidades
              </p>

              <DemoUserSelector />

              <div className="text-center">
                <button
                  onClick={redirectToLogin}
                  className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Entrar na Demonstração
                </button>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Esta é uma versão demo com dados fictícios para demonstração.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Economia colaborativa • Sustentabilidade • Comunidade
          </p>
        </div>
      </div>
    </div>
  );
}
