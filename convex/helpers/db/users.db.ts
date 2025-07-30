import { QueryCtx } from "../../_generated/server";
import { ConvexError } from "convex/values";
import { getOneFrom } from "convex-helpers/server/relationships";
import { Id } from "../../_generated/dataModel";

export const getByExternalId = async (ctx: QueryCtx, externalId: string) =>
  getOneFrom(ctx.db, 'users', 'by_external_id', externalId, 'externalId');

export const getCurrentUser = async (ctx: QueryCtx) => {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) return null;

  return getByExternalId(ctx, identity.subject);
};


export const getCurrentUserOrThrow = async (ctx: QueryCtx) => {
  const userRecord = await getCurrentUser(ctx);

  if (!userRecord) throw new ConvexError("User not found");

  return userRecord;
};

export const getUserOrThrow = async (ctx: QueryCtx, userId: Id<"users">) => {
  const userRecord = await ctx.db.get(userId);

  if (!userRecord) throw new ConvexError("User not found");

  return userRecord;
};