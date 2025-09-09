import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MockUser, getDemoUser, setDemoUser, clearDemoUser, mockUsers } from '@/shared/mockAuth';

interface DemoAuthContextType {
  user: MockUser | null;
  isPending: boolean;
  redirectToLogin: () => void;
  exchangeCodeForSessionToken: () => Promise<void>;
  logout: () => void;
  loginAsDemo: (userIndex?: number) => void;
}

const DemoAuthContext = createContext<DemoAuthContextType | null>(null);

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    // Check for existing demo session
    const demoUser = getDemoUser();
    if (demoUser) {
      setUser(demoUser);
    }
    setIsPending(false);
  }, []);

  const redirectToLogin = () => {
    // For demo, just login automatically
    loginAsDemo(0);
  };

  const exchangeCodeForSessionToken = async () => {
    // Mock exchange - for demo just login as first user
    await new Promise(resolve => setTimeout(resolve, 1000));
    loginAsDemo(0);
  };

  const logout = () => {
    clearDemoUser();
    setUser(null);
  };

  const loginAsDemo = (userIndex: number = 0) => {
    const demoUser = mockUsers[userIndex] || mockUsers[0];
    setDemoUser(demoUser);
    setUser(demoUser);
  };

  return (
    <DemoAuthContext.Provider value={{
      user,
      isPending,
      redirectToLogin,
      exchangeCodeForSessionToken,
      logout,
      loginAsDemo
    }}>
      {children}
    </DemoAuthContext.Provider>
  );
}

export function useDemoAuth() {
  const context = useContext(DemoAuthContext);
  if (!context) {
    throw new Error('useDemoAuth must be used within DemoAuthProvider');
  }
  return context;
}
