# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Tutorial

## Convex-Clerk User Sync System

This project now includes bidirectional sync between Convex and Clerk for user management.

### Setup Requirements

Add the following environment variable to your Convex deployment:

```bash
CLERK_SECRET_KEY=sk_test_... # Your Clerk secret key from Clerk Dashboard
```

### Features

#### 🔒 **Email Uniqueness Enforcement**

- Prevents multiple users from signing up with the same email address
- Database-level email indexing for fast lookups
- Descriptive error messages for duplicate email attempts

#### 🔄 **Bidirectional User Sync**

- **Clerk → Convex**: Automatic user creation when someone signs up via Clerk
- **Convex → Clerk**: Automatic user deletion from Clerk when deleted from Convex
- **Clerk → Convex**: Automatic user deletion from Convex when deleted from Clerk

### Admin Functions

#### Find Duplicate Users

```javascript
const duplicates = await convex.query(api.users.findDuplicateEmails);
console.log(duplicates);
```

#### Delete User (Both Systems)

```javascript
// Deletes from both Convex and Clerk
const result = await convex.mutation(api.users.deleteUser, { 
    userId: "user_id_here" 
});
```

#### Delete User (Convex Only)

```javascript
// Deletes only from Convex, keeps in Clerk
const result = await convex.mutation(api.users.deleteUserFromConvexOnly, { 
    userId: "user_id_here" 
});
```

#### Clean Up Duplicates

```javascript
// Keeps the oldest user, deletes the rest
const result = await convex.mutation(api.users.cleanupDuplicateUsers, {
    email: "user@example.com",
    keepUserId: "user_id_to_keep",
    deleteFromClerkToo: true
});
```

### Webhook Configuration

Make sure your Clerk webhook is configured to send to:

- `POST /clerk-webhook`
- Events: `user.created`, `user.deleted`

### Error Handling

The system gracefully handles cases where:

- Clerk deletion fails but Convex deletion succeeds
- User doesn't exist in one system but exists in the other
- Network issues or API timeouts

All operations are logged for debugging purposes.
