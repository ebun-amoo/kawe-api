import prisma from '../../lib/prisma';
import { createLessonInput, Lesson } from '../../types/lesson';

const createLessonService = async ({
  title,
  summary,
  content,
  level,
  orderIndex,
  isPublished = false,
  userId
}: createLessonInput): Promise<Lesson> => {
  const lesson = await prisma.lesson.create({
    data: {
      title, summary, content, level, orderIndex, isPublished, createdById: userId
    }
  });

  return {
    id: lesson.id,
    title: lesson.title, 
    summary: lesson.summary, 
    content: lesson.content, 
    level: lesson.level, 
    orderIndex: lesson.orderIndex, 
    isPublished: lesson.isPublished, 
    createdById: lesson.createdById
  }
}

export default createLessonService;