import { customCtx } from "convex-helpers/server/customFunctions";
import { zCustomQuery, zCustomMutation, zCustomAction } from "convex-helpers/server/zod";
import { QueryCtx, ActionCtx, MutationCtx, query, action, mutation } from "./_generated/server";
import { getCurrentUserOrThrow } from "./helpers/db/users.db";
import { Doc } from "./_generated/dataModel";
import { internal } from "./_generated/api";
import { ConvexError } from "convex/values";

export type QueryCtxWithAuth = QueryCtx & {
  user: Doc<'users'>;
};
export type ActionCtxWithAuth = ActionCtx & {
  user: Doc<'users'>;
};

export type MutationCtxWithAuth = MutationCtx & {
  user: Doc<'users'>;
};

const authQueryCtx = customCtx<QueryCtx, QueryCtxWithAuth>(async (ctx) => {
  const user = await getCurrentUserOrThrow(ctx);

  const authCtx: QueryCtxWithAuth = {
    ...ctx,
    user,
  };


  return authCtx;
});

const authActionCtx = customCtx<ActionCtx, ActionCtxWithAuth>(async (ctx) => {
  const user = await ctx.runQuery(internal.userInternal.currentUser);

  if (!user) {
    throw new ConvexError("User not found");
  }

  const authCtx: ActionCtxWithAuth = {
    ...ctx,
    user,
  };

  return authCtx;
});

const authMutationCtx = customCtx<MutationCtx, MutationCtxWithAuth>(
  async (ctx) => {
    const user = await getCurrentUserOrThrow(ctx);

    const authCtx: MutationCtxWithAuth = {
      ...ctx,
      user,
    };


    return authCtx;
  },
);



export const zQuery = zCustomQuery(query, authQueryCtx);
// export const zInternalQuery = zCustomQuery(internalQuery, authQueryCtx);
export const zMutation = zCustomMutation(mutation, authMutationCtx);
export const zAction = zCustomAction(action, authActionCtx);