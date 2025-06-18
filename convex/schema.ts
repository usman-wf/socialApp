import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        clerkId: v.string(),
        username: v.optional(v.string()),
        email: v.string(),
        fullname: v.optional(v.string()),        
        imageUrl: v.optional(v.string()),
        name: v.optional(v.string()),        
        followers: v.optional(v.array(v.string())),
        following: v.optional(v.array(v.string())),
        posts: v.optional(v.number()),
        comments: v.optional(v.array(v.string())),
        likes: v.optional(v.array(v.string())),
        bookmarks: v.optional(v.array(v.string())),
        notifications: v.optional(v.array(v.string())),
        messages: v.optional(v.array(v.string())),
        rooms: v.optional(v.array(v.string())),
        roomMessages: v.optional(v.array(v.string())),
        bio: v.optional(v.string()),
        location: v.optional(v.string()),
        website: v.optional(v.string()),
        isVerified: v.optional(v.boolean()),
        isActive: v.optional(v.boolean()),
        isDeleted: v.optional(v.boolean()),
        isPrivate: v.optional(v.boolean()),
        createdAt: v.optional(v.number()),
        updatedAt: v.optional(v.number()),
        isAdmin: v.optional(v.boolean()),
    }).index("by_clerkId", ["clerkId"])
    .index("by_email", ["email"]),

    posts:defineTable({
        userId:v.id("users"),
        storageId:v.string(),
        imageUrl:v.optional(v.string()),
        caption:v.optional(v.string()),
        comments:v.optional(v.array(v.string())),
        likes:v.optional(v.array(v.string())),
        createdAt:v.optional(v.number()),
        updatedAt:v.optional(v.number()),
        isDeleted:v.boolean(),
        isActive:v.boolean(),
        isPrivate:v.boolean(),
        isVerified:v.boolean(),
    }).index("by_userId",["userId"]),

    comments:defineTable({
        userId:v.id("users"),
        postId:v.id("posts"),
        content:v.string(),
        createdAt:v.optional(v.number()),
        updatedAt:v.optional(v.number()),
        isDeleted:v.boolean(),
        isActive:v.boolean(),
    }).index("by_userId",["userId"])
    .index("by_postId",["postId"]),

    likes:defineTable({
        userId:v.id("users"),
        postId:v.id("posts"),
        createdAt:v.optional(v.number()),
        updatedAt:v.optional(v.number()),
        isDeleted:v.boolean(),
        isActive:v.boolean(),
    }).index("by_userId",["userId"])
    .index("by_postId",["postId"]),

    follows:defineTable({
        followerId:v.id("users"),
        followingId:v.id("users"),
        createdAt:v.optional(v.number()),
        updatedAt:v.optional(v.number()),
        isDeleted:v.boolean(),
        isActive:v.boolean(),
    }).index("by_userId",["followerId"])
    .index("by_followingId",["followingId"]),

    notifications:defineTable({
        receiverId:v.id("users"),
        senderId:v.id("users"),
        type:v.union(v.literal("follow"),v.literal("like"),v.literal("comment")),
        createdAt:v.optional(v.number()),
        updatedAt:v.optional(v.number()),
        isDeleted:v.boolean(),
        isActive:v.boolean(),
    }).index("by_userId",["receiverId"]),
    

    bookmarks:defineTable({
        userId:v.id("users"),
        postId:v.id("posts"),
        createdAt:v.optional(v.number()),
        updatedAt:v.optional(v.number()),
        isDeleted:v.boolean(),
        isActive:v.boolean(),
    }).index("by_userId",["userId"])
    .index("by_postId",["postId"]),

    

    messages:defineTable({
        userId:v.id("users"),
        postId:v.id("posts"),
        createdAt:v.optional(v.number()),
        updatedAt:v.optional(v.number()),
        isDeleted:v.boolean(),
        isActive:v.boolean(),
    }).index("by_userId",["userId"])
    .index("by_postId",["postId"]),

    rooms:defineTable({
        userId:v.id("users"),
        createdAt:v.optional(v.number()),
        updatedAt:v.optional(v.number()),
        isDeleted:v.boolean(),
        isActive:v.boolean(),
    }).index("by_userId",["userId"]),
    
    roomMessages:defineTable({
        roomId:v.id("rooms"),
        userId:v.id("users"),
        createdAt:v.optional(v.number()),
        updatedAt:v.optional(v.number()),
        isDeleted:v.boolean(),
        isActive:v.boolean(),
    }).index("by_roomId",["roomId"])
    .index("by_userId",["userId"]),

    roomMembers:defineTable({
        roomId:v.id("rooms"),
        userId:v.id("users"),
        createdAt:v.optional(v.number()),
        updatedAt:v.optional(v.number()),
        isDeleted:v.boolean(),
        isActive:v.boolean(),
    }).index("by_roomId",["roomId"])
    .index("by_userId",["userId"]),

    
})