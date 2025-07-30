import { mutation, query } from "./_generated/server";
import { zAction, zMutation, zQuery } from "./convex.ctx";
import { api } from "./_generated/api";
import { zid } from "convex-helpers/server/zod";
import z from "zod";

export const getMessages = zQuery({
  args: {
    userId: zid("users"),
  },
  handler: async (ctx) => {
    // Get most recent messages first
    const messages = await ctx.db.query("messages").order("desc").take(50);
    // Reverse the list so that it's in a chronological order.
    return messages.reverse();
  },
});

export const sendMessage = zMutation({
  args: {
    userId: zid("users"),
    body: z.string(),
  },
  handler: async (ctx, args) => {
    console.log("This TypeScript function is running on the server.");
    await ctx.db.insert("messages", {
      userId: args.userId,
      body: args.body,
    });
  },
});


export const someAction = zAction({
  args: {
    userId: zid("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(api.user.getUser, {
      userId: args.userId,
    });

    console.log(user);

    return null;
  },
});