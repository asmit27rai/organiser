import {
  sqliteTable,
  text,
  integer,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  password: text("password").notNull(),
  image: text("image"),
});

export const fitnessPlans = sqliteTable("fitness_plan", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull().references(() => users.id),
  name: text("plan_name").notNull(),
  startDate: integer("start_date", { mode: "timestamp_ms" }).notNull().default(sql`(current_timestamp)`),
  endDate: integer("end_date", { mode: "timestamp_ms" }).notNull().default(sql`(current_timestamp)`),
});

export const exercises = sqliteTable("exercise", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("exercise_name").notNull(),
  duration: integer("duration"),
  type: text("type"),
});

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
type DayOfWeek = typeof daysOfWeek[number];

export const planExercises = sqliteTable("plan_exercise", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  planId: text("plan_id").notNull().references(() => fitnessPlans.id),
  exerciseId: text("exercise_id").notNull().references(() => exercises.id),
  day: text("day").$type<DayOfWeek>().notNull(),
});

export const exerciseSets = sqliteTable("exercise_set", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  planExerciseId: text("plan_exercise_id").notNull().references(() => planExercises.id),
  setNumber: integer("set_number").notNull(),
  reps: integer("reps").notNull(),
  repsDone: integer("reps_done").notNull(),
});
