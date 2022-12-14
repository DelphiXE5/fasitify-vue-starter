import { Route } from "./services/routing/types";

export const routes: Array<Route> = [
    { path: "/images", method: "GET" },
    { path: "/authentication/signup", method: "POST" },
    { path: "/authentication/login", method: "POST" },
];