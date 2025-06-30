import swagger from "@elysiajs/swagger";
import type Elysia from "elysia";

export const swaggerMiddleware = (app: Elysia) => {
	if (process.env.NODE_ENV === "development") {
		console.log("🚀 Swagger enabled");
		return app.use(swagger({ path: "/docs" }));
	}

	return app;
};
