import prisma from '../../lib/prisma';
import { Lesson, publishLessonInput } from '../../types/lesson';

const publishLessonService = async ({
  lessonId,
  isPublished
}: publishLessonInput): Promise<Lesson> => {
  const lesson = await prisma.lesson.update({
    where: {id: lessonId},
    data: {
      isPublished
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

export default publishLessonService;