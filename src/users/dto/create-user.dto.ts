import { email, z } from 'zod';

export const createUserSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    username: z.string(),
    password: z.string(),
    description: z.string(),
    email: z.email(),
  })
  .required();

export type CreateUserDto = z.infer<typeof createUserSchema>;
