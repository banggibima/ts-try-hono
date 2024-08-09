import { Hono } from "hono";
import { logger } from "hono/logger";
import user from "./routes/user";

const app = new Hono();

app.use(logger());
app.route("/api/users/", user);

export default app;
