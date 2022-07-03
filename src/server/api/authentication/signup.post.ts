import prisma from "@server/prisma/prisma";
import { Static, Type } from "@sinclair/typebox";

export const body = Type.Object({
    username: Type.String(),
    password: Type.String(),
});

const reply = Type.Object({
    error: Type.Optional(
        Type.Object({
            errorMessage: Type.String(),
        })
    ),
    data: Type.Optional(
        Type.Object({
            token: Type.String(),
        })
    ),
});

export default handleHttpRequest<{
    Body: Static<typeof body>;
    Reply: Static<typeof reply>;
}>({
    body: body,
    response: {
        "200": reply,
        "400": reply,
    },
    handler: async (request, reply) => {
        if (
            await prisma.user.findFirst({
                where: { username: request.body.username },
            })
        ) {
            reply.statusCode = 400;
            reply.send({ error: { errorMessage: "Username already exists!" } });
        }

        const user = await prisma.user.create({
            data: {
                username: request.body.username,
                password: request.body.password,
            },
        });

        const token = fastify.jwt.sign({
            username: user.username,
            password: user.password,
        });
        reply.send({ data: { token } });
    },
});
