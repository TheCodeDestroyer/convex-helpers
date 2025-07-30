import { zid } from "convex-helpers/server/zod";
import { zQuery } from "./convex.ctx";
import { getUserOrThrow } from "./helpers/db/users.db";

export const getUser = zQuery({
  args: {
    userId: zid("users"),
  },
  handler: (ctx, args) => {
    return getUserOrThrow(ctx, args.userId);
  },
});

