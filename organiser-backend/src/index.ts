import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { users } from "./schema";

export type ENV = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: ENV }>();

app.get("/users", async (c) => {
  const db = drizzle(c.env.DB);
  const allUsers = await db.select().from(users).all();
  return c.json(allUsers);
});

export default app;
