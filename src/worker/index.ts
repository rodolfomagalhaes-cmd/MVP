import { Hono } from "hono";
import { cors } from "hono/cors";
import { zValidator } from "@hono/zod-validator";
import { getCookie, setCookie } from "hono/cookie";
import {
  authMiddleware,
  exchangeCodeForSessionToken,
  getOAuthRedirectUrl,
  deleteSession,
  MOCHA_SESSION_TOKEN_COOKIE_NAME,
} from "@getmocha/users-service/backend";
import {
  CreateItemSchema,
  CreateReservationSchema,
} from "@/shared/types";
import z from "zod";

const app = new Hono<{ Bindings: Env }>();

app.use("*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE"],
  allowHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Auth routes
app.get('/api/oauth/google/redirect_url', async (c) => {
  const redirectUrl = await getOAuthRedirectUrl('google', {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  return c.json({ redirectUrl }, 200);
});

app.post("/api/sessions", zValidator("json", z.object({ code: z.string() })), async (c) => {
  const { code } = c.req.valid("json");

  const sessionToken = await exchangeCodeForSessionToken(code, {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
    maxAge: 60 * 24 * 60 * 60, // 60 days
  });

  return c.json({ success: true }, 200);
});

app.get("/api/users/me", authMiddleware, async (c) => {
  return c.json(c.get("user"));
});

app.get('/api/logout', async (c) => {
  const sessionToken = getCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME);

  if (typeof sessionToken === 'string') {
    await deleteSession(sessionToken, {
      apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
      apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
    });
  }

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, '', {
    httpOnly: true,
    path: '/',
    sameSite: 'none',
    secure: true,
    maxAge: 0,
  });

  return c.json({ success: true }, 200);
});

// Helper function to get resident from user
async function getResidentFromUser(c: any, userId: string) {
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM residents WHERE user_id = ? LIMIT 1"
  ).bind(userId).all();
  
  return results[0] || null;
}

// Resident routes
app.get("/api/residents/me", authMiddleware, async (c) => {
  const user = c.get("user")!;
  const resident = await getResidentFromUser(c, user.id);
  
  if (!resident) {
    return c.json({ error: "Resident profile not found" }, 404);
  }
  
  return c.json(resident);
});

app.post("/api/residents", authMiddleware, zValidator("json", z.object({
  condominium_id: z.number(),
  apartment_number: z.string(),
  full_name: z.string(),
  phone: z.string().optional(),
})), async (c) => {
  const user = c.get("user")!;
  const { condominium_id, apartment_number, full_name, phone } = c.req.valid("json");
  
  // Check if resident already exists
  const existing = await getResidentFromUser(c, user.id);
  if (existing) {
    return c.json({ error: "Resident profile already exists" }, 400);
  }
  
  const { success } = await c.env.DB.prepare(`
    INSERT INTO residents (user_id, condominium_id, apartment_number, full_name, email, phone, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
  `).bind(user.id, condominium_id, apartment_number, full_name, user.email, phone || null).run();
  
  if (!success) {
    return c.json({ error: "Failed to create resident profile" }, 500);
  }
  
  const resident = await getResidentFromUser(c, user.id);
  return c.json(resident, 201);
});

// Condominium routes
app.get("/api/condominiums", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM condominiums WHERE is_active = 1 ORDER BY name"
  ).all();
  
  return c.json(results);
});

app.get("/api/condominiums/:id", async (c) => {
  const id = c.req.param("id");
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM condominiums WHERE id = ? AND is_active = 1"
  ).bind(id).all();
  
  if (results.length === 0) {
    return c.json({ error: "Condominium not found" }, 404);
  }
  
  return c.json(results[0]);
});

// Items routes
app.get("/api/items", async (c) => {
  const category = c.req.query("category");
  const search = c.req.query("search");
  
  let query = `
    SELECT i.*, r.full_name as owner_name, r.apartment_number
    FROM items i
    JOIN residents r ON i.owner_id = r.id
    WHERE i.is_available = 1
  `;
  const params: any[] = [];
  
  if (category) {
    query += " AND i.category = ?";
    params.push(category);
  }
  
  if (search) {
    query += " AND (i.title LIKE ? OR i.description LIKE ?)";
    params.push(`%${search}%`, `%${search}%`);
  }
  
  query += " ORDER BY i.created_at DESC";
  
  const { results } = await c.env.DB.prepare(query).bind(...params).all();
  return c.json(results);
});

app.get("/api/items/:id", async (c) => {
  const id = c.req.param("id");
  const { results } = await c.env.DB.prepare(`
    SELECT i.*, r.full_name as owner_name, r.apartment_number, r.rating_average as owner_rating
    FROM items i
    JOIN residents r ON i.owner_id = r.id
    WHERE i.id = ?
  `).bind(id).all();
  
  if (results.length === 0) {
    return c.json({ error: "Item not found" }, 404);
  }
  
  return c.json(results[0]);
});

app.post("/api/items", authMiddleware, zValidator("json", CreateItemSchema), async (c) => {
  const user = c.get("user")!;
  const resident = await getResidentFromUser(c, user.id);
  
  if (!resident) {
    return c.json({ error: "Resident profile required" }, 400);
  }
  
  const itemData = c.req.valid("json");
  
  const { success, meta } = await c.env.DB.prepare(`
    INSERT INTO items (owner_id, title, description, category, daily_rate, image_url, rules, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
  `).bind(
    resident.id,
    itemData.title,
    itemData.description || null,
    itemData.category,
    itemData.daily_rate,
    itemData.image_url || null,
    itemData.rules || null
  ).run();
  
  if (!success) {
    return c.json({ error: "Failed to create item" }, 500);
  }
  
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM items WHERE id = ?"
  ).bind(meta.last_row_id).all();
  
  return c.json(results[0], 201);
});

app.get("/api/my-items", authMiddleware, async (c) => {
  const user = c.get("user")!;
  const resident = await getResidentFromUser(c, user.id);
  
  if (!resident) {
    return c.json({ error: "Resident profile required" }, 400);
  }
  
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM items WHERE owner_id = ? ORDER BY created_at DESC"
  ).bind(resident.id).all();
  
  return c.json(results);
});

// Reservations routes
app.post("/api/reservations", authMiddleware, zValidator("json", CreateReservationSchema), async (c) => {
  const user = c.get("user")!;
  const resident = await getResidentFromUser(c, user.id);
  
  if (!resident) {
    return c.json({ error: "Resident profile required" }, 400);
  }
  
  const { item_id, start_date, end_date } = c.req.valid("json");
  
  // Get item details
  const { results: itemResults } = await c.env.DB.prepare(
    "SELECT * FROM items WHERE id = ? AND is_available = 1"
  ).bind(item_id).all();
  
  if (itemResults.length === 0) {
    return c.json({ error: "Item not available" }, 400);
  }
  
  const item = itemResults[0];
  
  // Calculate total amount
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalAmount = (item.daily_rate as number) * days;
  const appFee = totalAmount * 0.1; // 10% fee
  
  const { success, meta } = await c.env.DB.prepare(`
    INSERT INTO reservations (item_id, renter_id, start_date, end_date, total_amount, app_fee, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
  `).bind(
    item_id,
    resident.id,
    start_date,
    end_date,
    totalAmount,
    appFee
  ).run();
  
  if (!success) {
    return c.json({ error: "Failed to create reservation" }, 500);
  }
  
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM reservations WHERE id = ?"
  ).bind(meta.last_row_id).all();
  
  return c.json(results[0], 201);
});

app.get("/api/my-reservations", authMiddleware, async (c) => {
  const user = c.get("user")!;
  const resident = await getResidentFromUser(c, user.id);
  
  if (!resident) {
    return c.json({ error: "Resident profile required" }, 400);
  }
  
  const { results } = await c.env.DB.prepare(`
    SELECT r.*, i.title as item_title, i.image_url as item_image, 
           owner.full_name as owner_name, owner.apartment_number as owner_apartment
    FROM reservations r
    JOIN items i ON r.item_id = i.id
    JOIN residents owner ON i.owner_id = owner.id
    WHERE r.renter_id = ?
    ORDER BY r.created_at DESC
  `).bind(resident.id).all();
  
  return c.json(results);
});

app.get("/api/my-rentals", authMiddleware, async (c) => {
  const user = c.get("user")!;
  const resident = await getResidentFromUser(c, user.id);
  
  if (!resident) {
    return c.json({ error: "Resident profile required" }, 400);
  }
  
  const { results } = await c.env.DB.prepare(`
    SELECT r.*, i.title as item_title, i.image_url as item_image,
           renter.full_name as renter_name, renter.apartment_number as renter_apartment
    FROM reservations r
    JOIN items i ON r.item_id = i.id
    JOIN residents renter ON r.renter_id = renter.id
    WHERE i.owner_id = ?
    ORDER BY r.created_at DESC
  `).bind(resident.id).all();
  
  return c.json(results);
});

// Stats routes for dashboard
app.get("/api/residents/stats", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT COUNT(*) as count FROM residents"
  ).all();
  
  return c.json(results);
});

app.get("/api/reservations/stats", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT COUNT(*) as count FROM reservations"
  ).all();
  
  return c.json(results);
});

export default app;
