// @ts-nocheck

// Always on top to ensure, that fastify is present
import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
const server = fastify();
global.fastify = server;

import * as glob from "@server/utils/global";
global.handleHttpRequest = glob.handleHttpRequest;

import { routing } from "./services/routing/routing";
import { middleware } from "./middleware/index";
import { store } from "./services/store/store";


store.push("fastify", server);

function setup() {
    registerPlugins(server);
    middleware();
    routing();

    server.listen({ port: 8080 }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address}`);
    });

    // Hot reloading
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => server.close());
    }
}
setup();

function registerPlugins(server) {
    server.register(fastifyJwt, {
        secret: "secret",
    });
}
