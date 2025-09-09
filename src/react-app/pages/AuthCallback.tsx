import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDemoAuth as useAuth } from '@/react-app/components/DemoAuthProvider';
import { Loader2 } from 'lucide-react';

export default function AuthCallback() {
  const { exchangeCodeForSessionToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await exchangeCodeForSessionToken();
        navigate('/');
      } catch (error) {
        console.error('Authentication failed:', error);
        navigate('/login');
      }
    };

    handleCallback();
  }, [exchangeCodeForSessionToken, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin mb-4">
          <Loader2 className="w-10 h-10 text-emerald-600 mx-auto" />
        </div>
        <h2 className="text-xl font-semibold text-gray-700">Finalizando login...</h2>
        <p className="text-gray-500 mt-2">Aguarde enquanto configuramos seu acesso</p>
      </div>
    </div>
  );
}
