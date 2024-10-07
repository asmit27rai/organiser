import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { JwtVariables, sign } from "hono/jwt";
import { getDB } from "../index";
import { Bindings } from "../../env";
import * as schema from "../schema";
import { authMiddleware } from "../middlewares/auth";

type Variables = JwtVariables;

const fitnessRouter = new Hono<{ Bindings: Bindings; Variables: Variables }>();

fitnessRouter.post("/plans", authMiddleware, async (c) => {
  try {
    const db = getDB(c);
    const { name, startDate, endDate } = await c.req.json();
    const userId = c.get("jwtPayload").userId;

    const newPlan = await db
      .insert(schema.fitnessPlans)
      .values({
        userId,
        name,
        startDate,
        endDate,
      })
      .returning({
        id: schema.fitnessPlans.id,
        name: schema.fitnessPlans.name,
        startDate: schema.fitnessPlans.startDate,
        endDate: schema.fitnessPlans.endDate,
      });

    return c.json({
      message: "Fitness plan created successfully",
      plan: newPlan[0],
    });
  } catch (error) {
    console.error("Error in /plans:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

fitnessRouter.get("/plans", authMiddleware, async (c) => {
  try {
    const db = getDB(c);
    const userId = c.get("jwtPayload").userId;

    const plans = await db.query.fitnessPlans.findMany({
      where: eq(schema.fitnessPlans.userId, userId),
    });

    return c.json(plans);
  } catch (error) {
    console.error("Error in /plans:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

fitnessRouter.post("/plans/:planId/exercises", authMiddleware, async (c) => {
  try {
    const db = getDB(c);
    const { name, duration, type, day } = await c.req.json();
    const planId = c.req.param("planId");

    const userId = c.get("jwtPayload").userId;
    const plan = await db.query.fitnessPlans.findFirst({
      where: eq(schema.fitnessPlans.id, planId),
    });

    if (!plan || plan.userId !== userId) {
      return c.json({ error: "Unauthorized or plan not found" }, 401);
    }

    const newExercise = await db
      .insert(schema.exercises)
      .values({
        name,
        duration,
        type,
      })
      .returning({
        id: schema.exercises.id,
        name: schema.exercises.name,
        duration: schema.exercises.duration,
        type: schema.exercises.type,
      })
      .get();

    const planExercise = await db
      .insert(schema.planExercises)
      .values({
        planId,
        exerciseId: newExercise.id,
        day,
      })
      .returning({
        id: schema.planExercises.id,
        planId: schema.planExercises.planId,
        exerciseId: schema.planExercises.exerciseId,
        day: schema.planExercises.day,
      });

    return c.json({
      message: "Exercise added to plan successfully",
      planExercise: planExercise[0],
    });
  } catch (error) {
    console.error("Error in /plans/:planId/exercises:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

fitnessRouter.get("/plans/:planId/exercises", authMiddleware, async (c) => {
  try {
    const db = getDB(c);
    const planId = c.req.param("planId");

    const exercises = await db.query.planExercises.findMany({
      where: eq(schema.planExercises.planId, planId),
      with: {
        exercise: true,
        exerciseSets: true,
      },
    });

    return c.json(exercises);
  } catch (error) {
    console.error("Error in /plans/:planId/exercises:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default fitnessRouter;