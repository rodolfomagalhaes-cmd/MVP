// Mock authentication for demo deployment

export interface MockUser {
  id: string;
  email: string;
  google_user_data?: {
    name: string;
    picture?: string;
  };
}

export const mockUsers: MockUser[] = [
  {
    id: "demo-user-1",
    email: "maria@demo.compartilhai.com",
    google_user_data: {
      name: "Maria Silva",
      picture: "https://images.unsplash.com/photo-1494790108755-2616b612b1fd?w=150&h=150&fit=crop&crop=face"
    }
  },
  {
    id: "demo-user-2", 
    email: "joao@demo.compartilhai.com",
    google_user_data: {
      name: "João Santos",
      picture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  },
  {
    id: "demo-user-3",
    email: "ana@demo.compartilhai.com", 
    google_user_data: {
      name: "Ana Costa",
      picture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  }
];

export const DEMO_SESSION_KEY = 'compartilhai_demo_session';

export function getDemoUser(): MockUser | null {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem(DEMO_SESSION_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
}

export function setDemoUser(user: MockUser): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(user));
}

export function clearDemoUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(DEMO_SESSION_KEY);
}

export function loginAsDemo(userIndex: number = 0): MockUser {
  const user = mockUsers[userIndex] || mockUsers[0];
  setDemoUser(user);
  return user;
}
