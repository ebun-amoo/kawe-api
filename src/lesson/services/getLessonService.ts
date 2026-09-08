import prisma from "../../lib/prisma"
import { LessonListItem } from "../../types/lesson";

const getLessonService = async(): Promise<LessonListItem[]> => {
  const lessons = await prisma.lesson.findMany({
    where: { isPublished: true },
    orderBy: { orderIndex: "asc" },
    select: {
      id: true,
      title: true,
      summary: true,
      level: true,
      orderIndex: true
    }
  });

  return lessons;
}

export default getLessonService;