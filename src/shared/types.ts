import z from "zod";

// Condominium schemas
export const CondominiumSchema = z.object({
  id: z.number(),
  name: z.string(),
  address: z.string().nullable(),
  manager_email: z.string().nullable(),
  commission_percentage: z.number().default(10),
  is_active: z.boolean().default(true),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Condominium = z.infer<typeof CondominiumSchema>;

// Resident schemas
export const ResidentSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  condominium_id: z.number(),
  apartment_number: z.string(),
  full_name: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  is_verified: z.boolean().default(false),
  rating_average: z.number().default(5.0),
  rating_count: z.number().default(0),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Resident = z.infer<typeof ResidentSchema>;

// Item schemas
export const ItemSchema = z.object({
  id: z.number(),
  owner_id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  category: z.string(),
  daily_rate: z.number(),
  image_url: z.string().nullable(),
  rules: z.string().nullable(),
  is_available: z.boolean().default(true),
  rating_average: z.number().default(5.0),
  rating_count: z.number().default(0),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Item = z.infer<typeof ItemSchema>;

export const CreateItemSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().optional(),
  category: z.string().min(1, "Categoria é obrigatória"),
  daily_rate: z.number().positive("Valor diário deve ser positivo"),
  image_url: z.string().url().optional(),
  rules: z.string().optional(),
});

export type CreateItem = z.infer<typeof CreateItemSchema>;

// Reservation schemas
export const ReservationSchema = z.object({
  id: z.number(),
  item_id: z.number(),
  renter_id: z.number(),
  start_date: z.string(),
  end_date: z.string(),
  total_amount: z.number(),
  app_fee: z.number(),
  status: z.enum(['pending', 'confirmed', 'active', 'completed', 'cancelled']),
  payment_status: z.enum(['pending', 'paid', 'failed']),
  pickup_confirmed_at: z.string().nullable(),
  return_confirmed_at: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Reservation = z.infer<typeof ReservationSchema>;

export const CreateReservationSchema = z.object({
  item_id: z.number(),
  start_date: z.string(),
  end_date: z.string(),
});

export type CreateReservation = z.infer<typeof CreateReservationSchema>;

// Rating schemas
export const RatingSchema = z.object({
  id: z.number(),
  reservation_id: z.number(),
  rater_id: z.number(),
  rated_id: z.number(),
  rating: z.number().min(1).max(5),
  comment: z.string().nullable(),
  type: z.enum(['item', 'user']),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Rating = z.infer<typeof RatingSchema>;

// Chat message schemas
export const ChatMessageSchema = z.object({
  id: z.number(),
  reservation_id: z.number(),
  sender_id: z.number(),
  message: z.string(),
  is_read: z.boolean().default(false),
  created_at: z.string(),
  updated_at: z.string(),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;

// Categories
export const ITEM_CATEGORIES = [
  'ferramentas',
  'eletrônicos',
  'cozinha',
  'casa-jardim',
  'esportes-lazer',
  'bebê-criança',
  'viagem',
  'outros'
] as const;

export type ItemCategory = typeof ITEM_CATEGORIES[number];
