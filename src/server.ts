import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import{ z} from "zod";

const app = fastify();

const prisma = new PrismaClient();

app.get("/users", async () => {
    const users = await prisma.user.findMany();
    return users;
})

app.post("/users", async (request, reply) => {
    const body = z.object({
        name: z.string(),
        email: z.string().email(),
    }).parse(request.body);

    const user = await prisma.user.create({
        data: body,
    });

    reply.status(201).send(user);
})


app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3333,
}).then(() => {
    console.log("Server is running");
})