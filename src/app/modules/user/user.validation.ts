import { z } from "zod";

export const createUserValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    name: z.string(),
    profileImage: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    role: z.string(),
    status: z.enum(['blocked', 'active']).default('active'),
    isDeleted:z.boolean().default(false)
  }),
});
export const updateUserValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    name: z.string().optional(),
    email: z.string().email().optional(),
    profileImage: z.string(),
    phone: z.string().optional(),
    address: z.string().optional(),
    role: z.string().optional(),
    status: z.enum(['blocked', 'active']).optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});
export const updateUserFollwersValidationSchema = z.object({
  body: z.object({
    userId: z.string(),
    followerId: z.string(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema
};
