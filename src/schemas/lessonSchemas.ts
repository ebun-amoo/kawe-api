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
    message: "Lesson level must be a valid level",
  }),
  orderIndex: z.int().positive({
    message: "Order Index must be a positive integer",
  }),
  isPublished: z.boolean().optional()
});

export const getLessonSchema = z.object({
  lessonId: z.uuid().trim().min(1, {
    message: "Lesson id is required"
  })
});

export const updateLessonParamsSchema = getLessonSchema;
export const publishLessonParamsSchema = getLessonSchema;
export const deleteLessonSchema = getLessonSchema;

export const publishLessonBodySchema = z.object({
  isPublished: z.boolean({
    message: "isPublished field is required"
  })
});

export const updateLessonBodySchema = z
  .object({
    title: z.string().trim().min(1).optional(),
    summary: z.string().trim().min(1).optional(),
    content: z.string().trim().min(1).optional(),
    level: z.enum(LessonLevel).optional(),
    orderIndex: z.int().positive().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Object cannot be empty. Provide at least one field.",
  });