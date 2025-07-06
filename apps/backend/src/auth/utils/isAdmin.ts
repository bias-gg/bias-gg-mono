import type { User } from "elysia-clerk";

export const isAdmin = (user: User) => {
  return user.privateMetadata.role === "admin";
};
