import { httpRouter } from "convex/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
    path: "/clerk-webhook",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        console.log("Webhook received at:", new Date().toISOString());
        
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
        if (!webhookSecret) {
            console.error("CLERK_WEBHOOK_SECRET is not set");
            throw new Error("CLERK_WEBHOOK_SECRET is not set");
        }
       
        const svix_id = request.headers.get("svix-id");
        const svix_timestamp = request.headers.get("svix-timestamp");
        const svix_signature = request.headers.get("svix-signature");

        console.log("Webhook headers:", { svix_id, svix_timestamp, svix_signature });

        if (!svix_id || !svix_timestamp || !svix_signature) {
            console.error("Missing svix headers");
            return new Response("Error: Missing svix headers", { status: 400 });
        }

        const payload = await request.json();
        console.log("Webhook payload:", JSON.stringify(payload, null, 2));
        const body = JSON.stringify(payload);

        const wh = new Webhook(webhookSecret);
        let evt: any;
        try {
            evt = wh.verify(body, {
                "svix-id": svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature": svix_signature,
            });
            console.log("Webhook verified successfully. Event type:", evt.type);
        } catch (error) {
            console.error("Error: Failed to verify webhook", error);
            return new Response("Error: Failed to verify webhook", { status: 400 });
        }

        if (evt.type === "user.created") {
            console.log("Processing user.created event");
            const user = evt.data;
            console.log("User data from webhook:", JSON.stringify(user, null, 2));
            
            // Extract user data from the webhook payload
            const { 
                id, 
                email_addresses, 
                first_name, 
                last_name, 
                username, 
                image_url,
                bio,
                location: userLocation,
                website 
            } = user;
            
            const email = email_addresses?.[0]?.email_address;
            const name = `${first_name || ""} ${last_name || ""}`.trim();

            console.log("Extracted user data:", {
                clerkId: id,
                email,
                fullname: name,
                username,
                imageUrl: image_url
            });

            try {
                const result = await ctx.runMutation(api.users.createUser, {
                    email,
                    fullname: name,
                    clerkId: id,
                    username: username || "",
                    imageUrl: image_url || "",
                    bio: bio || "",
                    location: userLocation || "",
                    website: website || "",
                    isActive: true,
                });
                
                console.log("User created in Convex with ID:", result);
                return new Response("User created successfully", { status: 200 });
            } catch (error) {
                console.error("Error: Failed to create user", error);
                return new Response("Error: Failed to create user", { status: 400 });
            }
        }

        if (evt.type === "user.deleted") {
            console.log("Processing user.deleted event");
            const { id: clerkId } = evt.data;
            
            console.log("Deleting user from Convex with clerkId:", clerkId);
            
            try {
                // Find the user in Convex by clerkId
                const user = await ctx.runQuery(api.users.getUserByClerkId, { clerkId });
                
                if (user) {
                    // Delete the user from Convex only (since they're already deleted from Clerk)
                    await ctx.runMutation(api.users.deleteUserFromConvexOnly, { userId: user._id });
                    console.log("User successfully deleted from Convex:", user.email);
                    return new Response("User deleted from Convex successfully", { status: 200 });
                } else {
                    console.log("User not found in Convex with clerkId:", clerkId);
                    return new Response("User not found in Convex", { status: 404 });
                }
            } catch (error) {
                console.error("Error: Failed to delete user from Convex", error);
                return new Response("Error: Failed to delete user from Convex", { status: 400 });
            }
        }
        
        console.log("Webhook processed successfully for event type:", evt.type);
        // Return success for other webhook types
        return new Response("Webhook processed successfully", { status: 200 });
    })
});

export default http;
    