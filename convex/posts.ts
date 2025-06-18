import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
        throw new Error("Unauthorized");
    }
    return await ctx.storage.generateUploadUrl();
})


export const createPost = mutation({
    args: {
        caption: v.string(),
        imageUrl: v.string(),
        storageId: v.string(),
        isPublished: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized");
        }
        const currentUser = await ctx.db.query("users").withIndex("by_clerkId",
        (q) => q.eq("clerkId", identity.subject)).first();
        if (!currentUser) {
            throw new Error("User not found");
        }

        if (!currentUser.isVerified) {
            throw new Error("User is not verified");
        }

        if(args.imageUrl.length === 0) {
            throw new Error("Image URL is required");
        }

        if(args.caption.length === 0) {
            throw new Error("Caption is required");
        }

        const post = await ctx.db.insert("posts", {
            caption: args.caption,
            imageUrl: args.imageUrl,
            storageId: args.storageId,
            isVerified: args.isPublished ?? true, // Published by default, can be draft if specified
            isActive: true,
            isDeleted: false,
            isPrivate: false,
            userId: currentUser._id,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        })

        await ctx.db.patch(currentUser._id, {

            posts: currentUser.posts? currentUser.posts+1:1,
        })

        return post;
    }
})

// Share/Publish a post (creates and publishes in one step)
export const sharePost = mutation({
    args: {
        caption: v.string(),
        imageUrl: v.string(),
        storageId: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized");
        }
        
        const currentUser = await ctx.db.query("users").withIndex("by_clerkId",
        (q) => q.eq("clerkId", identity.subject)).first();
        if (!currentUser) {
            throw new Error("User not found");
        }

        if (!currentUser.isVerified) {
            throw new Error("User is not verified");
        }

        if (args.imageUrl.length === 0) {
            throw new Error("Image URL is required");
        }

        if (args.caption.length === 0) {
            throw new Error("Caption is required");
        }

        // Create and immediately publish the post
        const post = await ctx.db.insert("posts", {
            caption: args.caption,
            imageUrl: args.imageUrl,
            storageId: args.storageId,
            isVerified: true, // Published/shared post
            isActive: true,
            isDeleted: false,
            isPrivate: false,
            userId: currentUser._id,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        })

        // Update user's post count
        await ctx.db.patch(currentUser._id, {
            posts: currentUser.posts ? currentUser.posts + 1 : 1,
        })

        return post;
    }
})

// Publish an existing draft post
export const publishPost = mutation({
    args: {
        postId: v.id("posts"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized");
        }

        const post = await ctx.db.get(args.postId);
        if (!post) {
            throw new Error("Post not found");
        }

        const currentUser = await ctx.db.query("users").withIndex("by_clerkId",
        (q) => q.eq("clerkId", identity.subject)).first();
        if (!currentUser) {
            throw new Error("User not found");
        }

        // Check if user owns the post
        if (post.userId !== currentUser._id) {
            throw new Error("Unauthorized to publish this post");
        }

        // Publish the post
        await ctx.db.patch(args.postId, {
            isVerified: true,
            updatedAt: Date.now(),
        });

        return await ctx.db.get(args.postId);
    }
})

export const getFeedPosts = query({
    handler:async(ctx)=>{
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Unauthorized");
        }
        const currentUser = await ctx.db.query("users").withIndex("by_clerkId",
        (q)=>q.eq("clerkId", identity.subject)).first();
        if(!currentUser){
            throw new Error("User not found");
        }
        const posts = await ctx.db.query("posts").withIndex("by_userId",
        (q)=>q.eq("userId", currentUser._id)).collect();
        return posts;
    }
})
