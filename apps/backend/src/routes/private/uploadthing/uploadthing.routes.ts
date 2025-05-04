import { Effect } from "effect";
import { Elysia } from "elysia";

import { createRouteHandler, makeAdapterHandler } from "uploadthing/server";

import { uploadRouter, type AdapterArgs } from "./router";
import { authMiddleware } from "../../../middleware/auth";

const requestHandler = makeAdapterHandler<[AdapterArgs["req"]], AdapterArgs>(
  (req) => Effect.succeed({ req }),
  (req) => Effect.succeed(req),
  { router: uploadRouter },
);

export const uploadthingRoutes = new Elysia({ prefix: "/uploadthing" })
  // authenticate any uploads made to uploadthing
  .get("/", ({ request }) => requestHandler(request))
  .post("/", ({ request }) => requestHandler(request));
