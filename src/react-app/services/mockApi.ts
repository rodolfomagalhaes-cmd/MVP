// Mock API service for demo deployment
import { mockApiResponses, mockItems, mockResidents } from '@/shared/mockData';
import { getDemoUser } from '@/shared/mockAuth';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class MockApiService {
  public async request(endpoint: string, options?: RequestInit): Promise<any> {
    await delay(300 + Math.random() * 500); // Random delay 300-800ms
    
    const method = options?.method || 'GET';
    const url = endpoint;
    
    console.log(`Mock API: ${method} ${url}`);
    
    // Handle different endpoints
    if (method === 'GET') {
      return this.handleGet(url);
    } else if (method === 'POST') {
      return this.handlePost(url, options);
    }
    
    throw new Error(`Mock API: Unsupported method ${method}`);
  }
  
  private handleGet(url: string): any {
    const queryIndex = url.indexOf('?');
    const basePath = queryIndex >= 0 ? url.substring(0, queryIndex) : url;
    const searchParams = queryIndex >= 0 ? new URLSearchParams(url.substring(queryIndex + 1)) : new URLSearchParams();
    
    switch (basePath) {
      case '/api/condominiums':
        return mockApiResponses['/api/condominiums'];
        
      case '/api/residents/me':
        const user = getDemoUser();
        return mockResidents.find(r => r.user_id === user?.id) || mockResidents[0];
        
      case '/api/items':
        let items = [...mockItems];
        const category = searchParams.get('category');
        const search = searchParams.get('search');
        
        if (category) {
          items = items.filter(item => item.category === category);
        }
        
        if (search) {
          const searchLower = search.toLowerCase();
          items = items.filter(item => 
            item.title.toLowerCase().includes(searchLower) ||
            item.description?.toLowerCase().includes(searchLower)
          );
        }
        
        return items;
        
      case '/api/my-items':
        const currentUser = getDemoUser();
        const currentResident = mockResidents.find(r => r.user_id === currentUser?.id);
        return mockItems.filter(item => item.owner_id === currentResident?.id);
        
      case '/api/residents/stats':
        return [{ count: mockResidents.length }];
        
      case '/api/reservations/stats':
        return [{ count: 12 }];
        
      default:
        // Handle item detail endpoints
        const itemMatch = basePath.match(/^\/api\/items\/(\d+)$/);
        if (itemMatch) {
          const itemId = parseInt(itemMatch[1]);
          const item = mockItems.find(i => i.id === itemId);
          if (!item) {
            throw new Error('Item not found');
          }
          return item;
        }
        
        throw new Error(`Mock API: Unknown endpoint ${basePath}`);
    }
  }
  
  private handlePost(url: string, options?: RequestInit): any {
    const body = options?.body ? JSON.parse(options.body as string) : {};
    
    switch (url) {
      case '/api/residents':
        // Mock creating resident profile
        const user = getDemoUser();
        const newResident = {
          id: mockResidents.length + 1,
          user_id: user?.id || 'demo-user-1',
          ...body,
          email: user?.email || 'demo@compartilhai.com',
          is_verified: true,
          rating_average: 5.0,
          rating_count: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        return newResident;
        
      case '/api/items':
        // Mock creating item
        const currentUser = getDemoUser();
        const currentResident = mockResidents.find(r => r.user_id === currentUser?.id) || mockResidents[0];
        const newItem = {
          id: mockItems.length + 1,
          owner_id: currentResident.id,
          ...body,
          is_available: true,
          rating_average: 5.0,
          rating_count: 0,
          owner_name: currentResident.full_name,
          apartment_number: currentResident.apartment_number,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        mockItems.push(newItem);
        return newItem;
        
      case '/api/reservations':
        // Mock creating reservation
        const item = mockItems.find(i => i.id === body.item_id);
        if (!item) {
          throw new Error('Item not found');
        }
        
        const startDate = new Date(body.start_date);
        const endDate = new Date(body.end_date);
        const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        const totalAmount = item.daily_rate * days;
        const appFee = totalAmount * 0.1;
        
        const newReservation = {
          id: Date.now(), // Simple ID generation
          ...body,
          total_amount: totalAmount,
          app_fee: appFee,
          status: 'pending',
          payment_status: 'pending',
          pickup_confirmed_at: null,
          return_confirmed_at: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        return newReservation;
        
      default:
        throw new Error(`Mock API: Unknown POST endpoint ${url}`);
    }
  }
  
  // Public methods that match the real API
  public get(url: string): Promise<any> {
    return this.request(url, { method: 'GET' });
  }
  
  public post(url: string, data: any): Promise<any> {
    return this.request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }
}

export const mockApi = new MockApiService();

// Override fetch for mock API calls
export function setupMockApi() {
  const originalFetch = window.fetch;
  
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url = input.toString();
    
    // Only intercept API calls
    if (url.startsWith('/api/') || url.includes('/api/')) {
      try {
        const data = await mockApi.request(url, init);
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return new Response(JSON.stringify({ error: errorMessage }), {
          status: errorMessage.includes('not found') ? 404 : 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    
    // For non-API calls, use original fetch
    return originalFetch(input, init);
  };
}
