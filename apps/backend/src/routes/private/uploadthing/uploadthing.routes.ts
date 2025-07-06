import { Effect } from "effect";
import { Elysia } from "elysia";
import { makeAdapterHandler } from "uploadthing/server";
import { authMiddleware } from "../../../middleware/auth";
import { type AdapterArgs, uploadRouter } from "./router";

const requestHandler = makeAdapterHandler<
  [AdapterArgs["req"], AdapterArgs["user"]],
  AdapterArgs
>(
  (req, user) => Effect.succeed({ req, user }),
  (req) => Effect.succeed(req),
  { router: uploadRouter },
);

export const uploadthingRoutes = new Elysia({ prefix: "/uploadthing" })
  // authenticate any uploads made to uploadthing
  .use(authMiddleware)
  .get("/", ({ request, user }) => requestHandler(request, user))
  .post("/", ({ request, user }) => requestHandler(request, user));
