import {z} from 'zod';

const EnvSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.string().transform((val) => parseInt(val, 10)).default(3000),
    MONGODB_SRV: z.string().default('mongodb://localhost:27017/mydatabase'),
});

export type AppConfig = z.infer<typeof EnvSchema>;

export const loadConfig = (env: NodeJS.ProcessEnv = process.env): AppConfig => {
    const parsed = EnvSchema.safeParse(env);
    if (!parsed.success) {
        throw new Error(`Invalid env: ${JSON.stringify(parsed.error)}`);
    }
    return Object.freeze(parsed.data);
};