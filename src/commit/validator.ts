import {z} from 'zod';

export const commitSchema = z
    .string()
    .max(72)
    .regex(/^(feat|fix|docs|test|refactor|chore)\(.+\): .+/);


    