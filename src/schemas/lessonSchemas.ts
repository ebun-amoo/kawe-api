import * as z from 'zod';
import { LessonLevel } from "../generated/prisma/enums";

export const createLessonSchema = z.object({
  title: z.string().trim().min(1, {
    message: "Lesson title is required",
  }),
  summary: z.string().trim().min(1, {
    message: "Lesson summary is required",
  }),
  content: z.string().trim().min(1, {
    message: "Lesson content is required",
  }),
  level: z.enum(LessonLevel, {
    message: "Lesson level is required",
  }),
  orderIndex: z.int().positive({
    message: "Order Index must be a positive integer",
  }),
  isPublished: z.boolean().optional()
})