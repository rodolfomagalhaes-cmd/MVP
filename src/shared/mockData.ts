// Mock data for demo deployment
export const mockCondominiums = [
  {
    id: 1,
    name: "Residencial Harmonia",
    address: "Rua das Flores, 123 - São Paulo, SP",
    manager_email: "admin@harmonia.com.br",
    commission_percentage: 10,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    name: "Condomínio Verde Vale",
    address: "Av. Central, 456 - Rio de Janeiro, RJ",
    manager_email: "contato@verdevale.com.br",
    commission_percentage: 12,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 3,
    name: "Edifício Solar",
    address: "Rua do Sol, 789 - Belo Horizonte, MG",
    manager_email: "gestao@edificiosolar.com.br",
    commission_percentage: 8,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  }
];

export const mockResidents = [
  {
    id: 1,
    user_id: "demo-user-1",
    condominium_id: 1,
    apartment_number: "101",
    full_name: "Maria Silva",
    email: "maria@email.com",
    phone: "(11) 99999-1234",
    is_verified: true,
    rating_average: 4.8,
    rating_count: 15,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    user_id: "demo-user-2",
    condominium_id: 1,
    apartment_number: "205",
    full_name: "João Santos",
    email: "joao@email.com",
    phone: "(11) 99999-5678",
    is_verified: true,
    rating_average: 4.9,
    rating_count: 22,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 3,
    user_id: "demo-user-3",
    condominium_id: 1,
    apartment_number: "312",
    full_name: "Ana Costa",
    email: "ana@email.com",
    phone: "(11) 99999-9012",
    is_verified: true,
    rating_average: 5.0,
    rating_count: 8,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  }
];

export const mockItems = [
  {
    id: 1,
    owner_id: 1,
    title: "Furadeira Bosch Professional",
    description: "Furadeira de impacto com maleta e acessórios. Perfeita para trabalhos domésticos e pequenos reparos.",
    category: "ferramentas",
    daily_rate: 25.00,
    image_url: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop&ixlib=rb-4.0.3",
    rules: "Devolver limpa e com todos os acessórios. Uso apenas para trabalhos domésticos.",
    is_available: true,
    rating_average: 4.8,
    rating_count: 12,
    owner_name: "Maria Silva",
    apartment_number: "101",
    created_at: "2024-01-10T00:00:00Z",
    updated_at: "2024-01-10T00:00:00Z"
  },
  {
    id: 2,
    owner_id: 2,
    title: "Air Fryer Philips 7L",
    description: "Fritadeira elétrica sem óleo, capacidade para 7 litros. Ideal para famílias grandes.",
    category: "eletrônicos",
    daily_rate: 15.00,
    image_url: "https://images.unsplash.com/photo-1585515656173-f8ba3d6c821a?w=800&h=600&fit=crop",
    rules: "Devolver limpa por dentro e por fora. Não usar produtos abrasivos.",
    is_available: true,
    rating_average: 4.9,
    rating_count: 8,
    owner_name: "João Santos",
    apartment_number: "205",
    created_at: "2024-01-12T00:00:00Z",
    updated_at: "2024-01-12T00:00:00Z"
  },
  {
    id: 3,
    owner_id: 3,
    title: "Conjunto de Panelas Antiaderente",
    description: "Kit completo com 5 panelas antiaderentes, tampas de vidro e cabos ergonômicos.",
    category: "cozinha",
    daily_rate: 12.00,
    image_url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
    rules: "Usar apenas utensílios de silicone ou madeira. Lavar à mão.",
    is_available: true,
    rating_average: 5.0,
    rating_count: 5,
    owner_name: "Ana Costa",
    apartment_number: "312",
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z"
  },
  {
    id: 4,
    owner_id: 1,
    title: "Aspirador de Pó",
    description: "Aspirador de pó vertical com potência ajustável e filtro HEPA. Ideal para limpeza doméstica.",
    category: "eletrônicos",
    daily_rate: 25.00,
    image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    rules: "Esvaziar o compartimento após uso. Trocar o saco quando necessário.",
    is_available: true,
    rating_average: 4.7,
    rating_count: 10,
    owner_name: "Maria Silva",
    apartment_number: "101",
    created_at: "2024-01-18T00:00:00Z",
    updated_at: "2024-01-18T00:00:00Z"
  },
  {
    id: 5,
    owner_id: 2,
    title: "Bicicleta Ergométrica",
    description: "Bike para exercícios em casa, com display digital e regulagem de intensidade.",
    category: "esportes-lazer",
    daily_rate: 20.00,
    image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    rules: "Limpar após o uso. Máximo 2 horas por sessão. Peso máximo 120kg.",
    is_available: true,
    rating_average: 4.6,
    rating_count: 7,
    owner_name: "João Santos",
    apartment_number: "205",
    created_at: "2024-01-20T00:00:00Z",
    updated_at: "2024-01-20T00:00:00Z"
  },
  {
    id: 6,
    owner_id: 3,
    title: "Liquidificador Industrial 2L",
    description: "Liquidificador profissional de alta potência, ideal para grandes quantidades.",
    category: "cozinha",
    daily_rate: 18.00,
    image_url: "https://images.unsplash.com/photo-1610557160540-0a09dfc8a17e?w=800&h=600&fit=crop",
    rules: "Não bater gelo sem líquido. Lavar imediatamente após uso.",
    is_available: true,
    rating_average: 4.8,
    rating_count: 6,
    owner_name: "Ana Costa",
    apartment_number: "312",
    created_at: "2024-01-22T00:00:00Z",
    updated_at: "2024-01-22T00:00:00Z"
  },
  {
    id: 7,
    owner_id: 1,
    title: "Kit Ferramentas Completo",
    description: "Caixa com mais de 50 ferramentas: chaves, alicates, martelo, trena e muito mais.",
    category: "ferramentas",
    daily_rate: 35.00,
    image_url: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop",
    rules: "Conferir todas as peças na entrega e devolução. Manter organizadas na caixa.",
    is_available: true,
    rating_average: 4.9,
    rating_count: 15,
    owner_name: "Maria Silva",
    apartment_number: "101",
    created_at: "2024-01-25T00:00:00Z",
    updated_at: "2024-01-25T00:00:00Z"
  },
  {
    id: 8,
    owner_id: 2,
    title: "Projetor Full HD",
    description: "Projetor portátil 1080p com entrada HDMI, USB e wireless. Ideal para apresentações e cinema em casa.",
    category: "eletrônicos",
    daily_rate: 40.00,
    image_url: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=800&h=600&fit=crop",
    rules: "Incluir todos os cabos. Usar em ambiente escuro para melhor qualidade.",
    is_available: true,
    rating_average: 4.7,
    rating_count: 9,
    owner_name: "João Santos",
    apartment_number: "205",
    created_at: "2024-01-28T00:00:00Z",
    updated_at: "2024-01-28T00:00:00Z"
  }
];

export const mockReservations = [
  {
    id: 1,
    item_id: 1,
    renter_id: 2,
    start_date: "2024-02-01",
    end_date: "2024-02-03",
    total_amount: 50.00,
    app_fee: 5.00,
    status: "completed",
    payment_status: "paid",
    pickup_confirmed_at: "2024-02-01T10:00:00Z",
    return_confirmed_at: "2024-02-03T18:00:00Z",
    created_at: "2024-01-30T00:00:00Z",
    updated_at: "2024-02-03T18:00:00Z"
  },
  {
    id: 2,
    item_id: 2,
    renter_id: 1,
    start_date: "2024-02-05",
    end_date: "2024-02-07",
    total_amount: 30.00,
    app_fee: 3.00,
    status: "active",
    payment_status: "paid",
    pickup_confirmed_at: "2024-02-05T09:00:00Z",
    return_confirmed_at: null,
    created_at: "2024-02-03T00:00:00Z",
    updated_at: "2024-02-05T09:00:00Z"
  }
];

// Mock API responses
export const mockApiResponses = {
  '/api/condominiums': mockCondominiums,
  '/api/residents/me': mockResidents[0], // Default to first resident
  '/api/items': mockItems,
  '/api/my-items': mockItems.filter(item => item.owner_id === 1),
  '/api/my-reservations': [],
  '/api/residents/stats': [{ count: mockResidents.length }],
  '/api/reservations/stats': [{ count: mockReservations.length }]
};
