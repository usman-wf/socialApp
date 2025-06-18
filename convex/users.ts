import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Helper function to delete user from Clerk
async function deleteUserFromClerk(clerkId: string): Promise<boolean> {
    const clerkSecretKey = process.env.CLERK_SECRET_KEY;
    
    if (!clerkSecretKey) {
        console.error("CLERK_SECRET_KEY is not set");
        throw new Error("CLERK_SECRET_KEY is not configured");
    }

    try {
        const response = await fetch(`https://api.clerk.com/v1/users/${clerkId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${clerkSecretKey}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log(`Successfully deleted user ${clerkId} from Clerk`);
            return true;
        } else {
            const errorText = await response.text();
            console.error(`Failed to delete user ${clerkId} from Clerk:`, response.status, errorText);
            return false;
        }
    } catch (error) {
        console.error(`Error deleting user ${clerkId} from Clerk:`, error);
        return false;
    }
}

// Utility function to find users with duplicate emails (for admin use)
export const findDuplicateEmails = query({
    handler: async (ctx) => {
        const allUsers = await ctx.db.query("users").collect();
        const emailCounts: { [email: string]: any[] } = {};
        
        // Group users by email
        allUsers.forEach(user => {
            if (!emailCounts[user.email]) {
                emailCounts[user.email] = [];
            }
            emailCounts[user.email].push({
                _id: user._id,
                clerkId: user.clerkId,
                email: user.email,
                fullname: user.fullname,
                createdAt: user.createdAt
            });
        });
        
        // Return only emails with duplicates
        const duplicates: { [email: string]: any[] } = {};
        Object.keys(emailCounts).forEach(email => {
            if (emailCounts[email].length > 1) {
                duplicates[email] = emailCounts[email].sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
            }
        });
        
        return duplicates;
    }
});

// Utility function to get user by email (for admin use)
export const getUserByEmail = query({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("users")
            .withIndex("by_email", q => q.eq("email", args.email))
            .collect();
    }
});

// Utility function to get user by Clerk ID (used by webhooks)
export const getUserByClerkId = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("users")
            .withIndex("by_clerkId", q => q.eq("clerkId", args.clerkId))
            .first();
    }
});

// Utility function to delete a user by ID (for admin use) - now syncs with Clerk
export const deleteUser = mutation({
    args: { 
        userId: v.id("users"),
        deleteFromClerkToo: v.optional(v.boolean()) // Option to skip Clerk deletion if needed
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.userId);
        if (!user) {
            throw new Error("User not found");
        }
        
        let clerkDeletionSuccess = true;
        
        // Delete from Clerk first (if requested)
        if (args.deleteFromClerkToo !== false) { // Default to true
            try {
                clerkDeletionSuccess = await deleteUserFromClerk(user.clerkId);
            } catch (error) {
                console.error("Failed to delete user from Clerk:", error);
                clerkDeletionSuccess = false;
                // You can choose to throw here if you want to prevent Convex deletion on Clerk failure
                // throw new Error(`Failed to delete user from Clerk: ${error}`);
            }
        }
        
        // Delete from Convex database
        await ctx.db.delete(args.userId);
        
        console.log("User deletion summary:", {
            email: user.email,
            clerkId: user.clerkId,
            deletedFromConvex: true,
            deletedFromClerk: clerkDeletionSuccess,
            skippedClerkDeletion: args.deleteFromClerkToo === false
        });
        
        return { 
            success: true, 
            deletedUser: user,
            clerkDeletionSuccess,
            warning: !clerkDeletionSuccess ? "User deleted from Convex but failed to delete from Clerk" : undefined
        };
    }
});

// New function to delete only from Convex (keeps user in Clerk)
export const deleteUserFromConvexOnly = mutation({
    args: { userId: v.id("users") },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.userId);
        if (!user) {
            throw new Error("User not found");
        }
        
        // Delete from Convex database only
        await ctx.db.delete(args.userId);
        
        console.log("User deleted from Convex only:", {
            email: user.email,
            clerkId: user.clerkId,
            deletedFromConvex: true,
            deletedFromClerk: false
        });
        
        return { 
            success: true, 
            deletedUser: user,
            clerkDeletionSuccess: false,
            note: "User deleted from Convex only - kept in Clerk"
        };
    }
});


export const createUser = mutation({
    args: {
        username: v.optional(v.string()),
        email: v.string(),
        imageUrl: v.optional(v.string()),
        clerkId: v.string(),
        fullname: v.optional(v.string()),
        bio: v.optional(v.string()),
        location: v.optional(v.string()),
        website: v.optional(v.string()),
        isAdmin: v.optional(v.boolean()),
        isActive: v.optional(v.boolean()),
        isDeleted: v.optional(v.boolean()),
        posts:v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        // Check if user already exists with the same clerkId
        const existingUserByClerkId = await ctx.db
            .query("users")
            .withIndex("by_clerkId", q => q.eq("clerkId", args.clerkId))
            .first();

        if (existingUserByClerkId) {
            console.log("User already exists with clerkId:", args.clerkId);
            return existingUserByClerkId._id;
        }

        // Check if user already exists with the same email
        const existingUserByEmail = await ctx.db
            .query("users")
            .withIndex("by_email", q => q.eq("email", args.email))
            .first();

        if (existingUserByEmail) {
            console.log("User already exists with email:", args.email);
            throw new Error(`An account with email ${args.email} already exists. Please use a different email address or sign in to your existing account.`);
        }

        const user = await ctx.db.insert("users", {
            username: args.username || "",
            email: args.email,
            imageUrl: args.imageUrl || "",
            clerkId: args.clerkId,
            fullname: args.fullname || "",
            bio: args.bio || "",
            location: args.location || "",
            website: args.website || "",
            name: args.fullname || "", // Set name field
            isVerified: true, // Auto-verify users for now
            isPrivate: false,
            isAdmin: args.isAdmin ?? false,
            isActive: args.isActive ?? true,
            isDeleted: args.isDeleted ?? false,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            posts: args.posts ?? 0,
            followers: [],
            following: [],
            comments: [],
            likes: [],
            bookmarks: [],
            notifications: [],
            messages: [],
            rooms: [],
            roomMessages: []
        });

        console.log("User created successfully:", user);
        return user;
    }
});

// Verify all existing unverified users (temporary utility)
export const verifyAllUsers = mutation({
    handler: async (ctx) => {
        const unverifiedUsers = await ctx.db
            .query("users")
            .filter(q => q.eq(q.field("isVerified"), false))
            .collect();

        for (const user of unverifiedUsers) {
            await ctx.db.patch(user._id, {
                isVerified: true,
                updatedAt: Date.now(),
            });
        }

        return { 
            message: `Verified ${unverifiedUsers.length} users`,
            verifiedUsers: unverifiedUsers.length
        };
    }
});