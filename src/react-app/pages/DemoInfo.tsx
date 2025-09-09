import { Info, ExternalLink, Smartphone, Monitor } from 'lucide-react';

export default function DemoInfo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-bold text-2xl">C</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
            COMPARTILHAÍ
          </h1>
          <p className="text-xl text-gray-600">
            Versão Demonstração Web
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-xl border border-white/20 space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Info className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Sobre esta Demonstração</h3>
              <p className="text-gray-600">
                Esta é uma versão completa e funcional do COMPARTILHAÍ, otimizada para iPad e dispositivos móveis. 
                Todos os dados são fictícios e as funcionalidades estão em modo demonstração.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Otimizado para iPad</h3>
              <p className="text-gray-600">
                Interface responsiva que se adapta perfeitamente ao iPad, com gestos touch, 
                navegação intuitiva e design otimizado para telas touch.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Monitor className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Progressive Web App</h3>
              <p className="text-gray-600">
                Funciona como um app nativo - pode ser instalado na tela inicial do iPad 
                e funciona offline após o primeiro carregamento.
              </p>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <h4 className="font-medium text-emerald-800 mb-2">Funcionalidades Disponíveis:</h4>
            <ul className="text-emerald-700 text-sm space-y-1">
              <li>• Sistema de autenticação (modo demo)</li>
              <li>• Cadastro e busca de itens</li>
              <li>• Sistema de reservas</li>
              <li>• Gestão de perfil de morador</li>
              <li>• Interface responsiva e moderna</li>
              <li>• Dashboard administrativo</li>
            </ul>
          </div>

          <div className="text-center">
            <a
              href="/"
              className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Acessar Demonstração
            </a>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Deploy realizado em servidor gratuito • Acesse no seu iPad
          </p>
        </div>
      </div>
    </div>
  );
}
