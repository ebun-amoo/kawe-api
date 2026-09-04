import * as z from "zod";
import { UserRole } from "../generated/prisma/enums";

export const registerSchema = z.object({
  firstName: z.string().trim().min(1, {
    message: "First name is required",
  }),
  lastName: z.string().trim().min(1, {
    message: "Last name is required",
  }),
  email: z.email({
    message: "Please enter a valid email address"
  }),
  password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }).regex(/[^a-zA-Z0-9]/, {
      message: "Password must include at least one special character",
    })
});

export const loginSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address"
  }),
  password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }).regex(/[^a-zA-Z0-9]/, {
      message: "Password must include at least one special character",
    })
});

export const payloadSchema = z.object({
  sub: z.uuid({
    message: "Invalid id"
  }),
  role: z.enum(UserRole)
});