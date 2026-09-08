import prisma from "../../lib/prisma"
import { LessonListItem } from "../../types/lesson";

const getALessonService = async(lessonId: string): Promise<LessonListItem | null> => {
  const lesson = await prisma.lesson.findFirst({
    where: { isPublished: true, id: lessonId },
    select: {
      id: true,
      title: true,
      summary: true,
      content: true,
      level: true,
      orderIndex: true
    }
  });

  return lesson;
}

export default getALessonService;