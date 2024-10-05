import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { JwtVariables, sign } from "hono/jwt";
import { getDB } from "../index";
import { Bindings } from "../../env";
import * as schema from "../schema";
import { authMiddleware } from "../middlewares/auth";

type Variables = JwtVariables;

const userRouter = new Hono<{ Bindings: Bindings; Variables: Variables }>();

userRouter.post("auth/register", async (c) => {
    try{
        const db = getDB(c);
        const { name, email, password, image } = await c.req.json();

        const userExist = await db.query.users.findFirst({
            where: eq(schema.users.email, email),
        })

        if(userExist){
            return c.json({ error: "User already exists" }, 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.insert(schema.users).values({
            email,
            password: hashedPassword,
            name,
            image,
        }).returning().get();

        if(!c.env.AUTH_SECRET) {
            console.error("AUTH_SECRET not found in env");
            return c.json({error: "Internal server error"}, 500);
        }
        const token = await sign(
            {userId: newUser.id},
            c.env.AUTH_SECRET,
        )

        return c.json({
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                image: newUser.image,
            },
        });
    }catch (error) {
        console.error("Error in /api/auth/register:", error);
        return c.json({ error: "Internal server error" }, 500);
    }
});

userRouter.post("auth/login", async (c) => {
    const db = getDB(c);
    const { email, password } = await c.req.json();

    const user = await db.query.users.findFirst({
        where: eq(schema.users.email, email),
    });

    if(!user || !bcrypt.compare(password, user.password)){
        return c.json({ error: "Invalid email or password" }, 401);
    }

    const token = await sign(
        {userId: user.id},
        c.env.AUTH_SECRET,  
    );

    return c.json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
        },
    });
});

userRouter.get("/:id", authMiddleware, async (c) => {
    const db = getDB(c);
    const userId = c.req.param("id");

    const user = await db.query.users.findFirst({
        where: eq(schema.users.id, userId),
    });

    if(!user){
        return c.json({ error: "User not found" }, 404);
    }

    return c.json({
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
        },
    });
});

userRouter.put("/:id", authMiddleware, async (c) => {
    const db = getDB(c);
    const userId = c.req.param("id");
    const { name, image } = await c.req.json();

    if(userId !==c.get("jwtPayload").userId){
        return c.json({ error: "Unauthorized" }, 401);
    }

    const updatedUser = await db.update(schema.users).set({name, image}).where(eq(schema.users.id, userId)).returning({
        id: schema.users.id,
        name: schema.users.name,
        email: schema.users.email,
        image: schema.users.image,
    });

    return c.json(updatedUser[0]);
});

export default userRouter;