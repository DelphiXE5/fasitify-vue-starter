//@ts-nocheck
import { join, dirname } from 'path'
import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./client/src", import.meta.url)),
        },
    },
    root: join(dirname(new URL(import.meta.url).pathname), 'client'),
    build: {
        outDir: "../../out"
    }
});
