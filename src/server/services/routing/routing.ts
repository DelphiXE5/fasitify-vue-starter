import { Log } from "@server/utils/log";
import { RouteShorthandOptions } from "fastify";
import { httpMethod, Handler } from "./types";
import { routes } from "@server/routes"
const Logger = new Log(module.id.split("/").at(-1));

const fastifyHttpMethods: Partial<{ [key in httpMethod]: any }> = {
    GET: (route, opts, handler) => {
        return fastify.get(route, opts, handler);
    },
    POST: (route, opts, handler) => {
        return fastify.post(route, opts, handler);
    },
    PUT: (route, opts, handler) => {
        return fastify.put(route, opts, handler);
    },
    PATCH: (route, opts, handler) => {
        return fastify.patch(route, opts, handler);
    },
};

export function routing() {
    routes.forEach(async (route) => {
        let apiHandler: Handler = (await import(
            `@server/api${route.path}.${route.method.toLowerCase()}`
        )).default;
        if (typeof apiHandler.handler !== "function") {
            Logger.error(
                `failed to load handler for route "/api${
                    route.path
                }.${route.method.toLowerCase()}"`
            );
            return;
        }
        Logger.log(`register route "/api${route.path}"`);
        let opts: RouteShorthandOptions = {};
        opts.schema = {};

        if (route.auth) {
            opts.preHandler = fastify.authenticate;
        }
        if (apiHandler.body !== undefined) {
            opts.schema.body = apiHandler.body;
        }
        if (apiHandler.response !== undefined) {
            opts.schema.response = apiHandler.response;
        }

        fastifyHttpMethods[route.method](
            `/api${route.path}`,
            opts,
            apiHandler.handler
        );
    });
}
