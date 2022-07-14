const { z } = require("zod");

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    NEXTAUTH_SECRET: z.string(),
    NEXTAUTH_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    TWITTER_CLIENT_ID: z.string(),
    TWITTER_CLIENT_SECRET: z.string(),

    // PUSHER_APP_ID: z.string(),
    // NEXT_PUBLIC_PUSHER_APP_KEY: z.string(),
    // PUSHER_APP_SECRET: z.string(),
    // PUSHER_APP_CLUSTER: z.string(),
});

module.exports.envSchema = envSchema;