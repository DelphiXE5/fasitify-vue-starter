import { createApp } from "./main.js";
import { routes } from "./router/index";

export default {
    // Provides client-side navigation routes to server
    routes,
    // Provides function needed to perform SSR
    createApp,
};
