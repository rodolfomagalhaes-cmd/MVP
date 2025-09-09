import { useState } from 'react';
import { mockUsers } from '@/shared/mockAuth';
import { useDemoAuth } from '@/react-app/components/DemoAuthProvider';
import { User, ChevronDown } from 'lucide-react';

export default function DemoUserSelector() {
  const { loginAsDemo } = useDemoAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleUserSelect = (userIndex: number) => {
    loginAsDemo(userIndex);
    setIsOpen(false);
  };

  return (
    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="text-blue-800 font-medium mb-3 flex items-center">
        <User className="w-4 h-4 mr-2" />
        Modo Demonstração
      </h3>
      <p className="text-blue-700 text-sm mb-3">
        Escolha um usuário para testar a plataforma:
      </p>
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-3 py-2 bg-white border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <span className="text-gray-700">Selecionar usuário demo</span>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            {mockUsers.map((user, index) => (
              <button
                key={user.id}
                onClick={() => handleUserSelect(index)}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                <div className="flex items-center space-x-3">
                  {user.google_user_data?.picture ? (
                    <img
                      src={user.google_user_data.picture}
                      alt={user.google_user_data.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{user.google_user_data?.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
