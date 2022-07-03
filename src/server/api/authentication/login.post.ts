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
        let user = await prisma.user.findFirst({
            where: {
                username: request.body.username,
            },
        });

        if (!user) {
            reply.status(400).send({ error: { errorMessage: "Your Username is wrong" } });
            return;
        }

        if (user.password !== request.body.password) {
            reply.status(400).send({ error: { errorMessage: "Your Password is wrong" } });
            return;
        }

        const token = fastify.jwt.sign({
            username: user.username,
            password: user.password,
        });
        reply.send({ data: { token } });
    },
});
