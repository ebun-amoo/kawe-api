import prisma from '../../lib/prisma';
import { Lesson, updateLessonInput } from '../../types/lesson';

const updateLessonService = async ({
  lessonId,
  title,
  summary,
  content,
  level,
  orderIndex
}: updateLessonInput): Promise<Lesson> => {
  const lesson = await prisma.lesson.update({
    where: {id: lessonId},
    data: {
      title,
      summary,
      content,
      level,
      orderIndex
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

export default updateLessonService;