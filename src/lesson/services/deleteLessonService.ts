import prisma from "../../lib/prisma"

const deleteLessonService = async(lessonId: string): Promise<void> => {
  await prisma.lesson.delete({
    where: { id: lessonId }
  });
}

export default deleteLessonService;