import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "email is required." }),
    password: z.string({ required_error: "Password is required" }),
  }),
});
const forgetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "email is required." }),
  }),
});
const resetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "email is required." }),
    newPassword: z.string({ required_error: "Password is required" }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
  refreshTokenValidationSchema
};
