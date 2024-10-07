import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";
import { Bindings } from "../env";
import {cors} from "hono/cors";
import { JwtVariables } from "hono/jwt";
import { logger } from "hono/logger";
import { Context, Hono } from "hono";
import userRouter from "./routes/user";
import fitnessRouter from "./routes/fitness";

type Variables = JwtVariables;

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

app.use(
  "*",
  cors({
    origin: (origin) => origin,
    credentials: true,
  }),
);
app.use(logger());

app.route("api/users",userRouter);
app.route("api/fitness",fitnessRouter);

export const getDB = (c: Context) => drizzle(c.env.DATABASE,{ schema });

export default app;
