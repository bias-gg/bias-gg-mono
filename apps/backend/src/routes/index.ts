import type { Elysia } from "elysia";
import { userAdminRoutes } from "./admin/userAdmin.routes";
import { artistRoutes } from "./artists.routes";
import { cardRoutes } from "./cards.routes";
import { groupRoutes } from "./groups.routes";
import { authGroupRoutes } from "./private/groups.routes";
import { portfolioRoutes } from "./private/portfolio.routes";
import { uploadthingRoutes } from "./private/uploadthing/uploadthing.routes";
import { releasesRoutes } from "./releases.routes";

export const setupRoutes = (app: Elysia) => {
  return (
    app
      .get("/", () => ({ healthy: true }))
      .use(cardRoutes)
      .use(artistRoutes)
      .use(groupRoutes)
      .use(releasesRoutes)
      // authorized routes
      .use(portfolioRoutes)
      .use(userAdminRoutes)
      .use(uploadthingRoutes)
      .use(authGroupRoutes)
  );
};
