import { zid } from "convex-helpers/server/zod";
import { internalQuery, query } from "./_generated/server";
import { zQuery } from "./convex.ctx";
import { getCurrentUserOrThrow, getUserOrThrow } from "./helpers/db/users.db";

export const currentUser = internalQuery({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUserOrThrow(ctx);
  },
});



