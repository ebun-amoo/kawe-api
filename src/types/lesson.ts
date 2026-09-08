import { LessonLevel } from "../generated/prisma/enums";

export interface createLessonInput {
  userId: string,
  title: string, 
  summary: string, 
  content: string, 
  level: LessonLevel, 
  orderIndex: number, 
  isPublished?: boolean
};

export interface Lesson {
  id: string,
  title: string, 
  summary: string, 
  content: string, 
  level: LessonLevel, 
  orderIndex: number, 
  isPublished: boolean,
  createdById: string
};

export interface LessonListItem {
  id: string,
  title: string, 
  summary: string, 
  level: LessonLevel, 
  orderIndex: number
}