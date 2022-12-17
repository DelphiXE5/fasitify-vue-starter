import { createApp } from "./src/main";
import { routes } from "./src/router/index";

export default {
    // Provides client-side navigation routes to server
    routes,
    // Provides function needed to perform SSR
    createApp,
};
