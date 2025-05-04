import { Elysia } from "elysia";
import { cardRoutes } from "./cards.routes";
import { artistRoutes } from "./artists.routes";
import { portfolioRoutes } from "./private/portfolio.routes";
import { userAdminRoutes } from "./admin/userAdmin.routes";
import { groupRoutes } from "./groups.routes";
import { releasesRoutes } from "./releases.routes";
import { uploadthingRoutes } from "./private/uploadthing/uploadthing.routes";

export const setupRoutes = (app: Elysia) => {
  return app
    .get('/', () => ({ healthy: true }))
    .use(cardRoutes)
    .use(artistRoutes)
    .use(portfolioRoutes)
    .use(userAdminRoutes)
    .use(groupRoutes)
    .use(releasesRoutes)
    .use(uploadthingRoutes)
};
