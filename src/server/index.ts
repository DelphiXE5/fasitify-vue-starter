// @ts-nocheck

// Always on top to ensure, that fastify is present
import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import FastifyVite from 'fastify-vite'
const server = fastify();
global.fastify = server;

import * as glob from "@server/utils/global";
global.handleHttpRequest = glob.handleHttpRequest;

import { routing } from "./services/routing/routing";
import { middleware } from "./middleware/index";
import { store } from "./services/store/store";
import renderer from './services/vueSSR/renderer'


store.push("fastify", server);

async function setup() {
    await registerPlugins(server);
    middleware();
    routing();

    await server.vite.ready()
    await server.listen({ port: 8080 }, (err, address) => {
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

async function registerPlugins(server) {
    await server.register(fastifyJwt, {
        secret: "secret",
    });
    console.log(import.meta.url.replace("server/index.ts", ""));
    await server.register(FastifyVite, {
      renderer,
      dev: true,
      clientModule: "src/index.ts",
      root: import.meta.url.replace("server/index.ts", ""), 
    })
}
