import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    externalId: v.string(),
  }).index("by_external_id", ["externalId"]),
  messages: defineTable({
    userId: v.id("users"),
    body: v.string(),
  }),
});