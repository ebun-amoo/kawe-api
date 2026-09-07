import { Response, Request } from "express";
import createLessonService from "../services/createLessonService";
import { createLessonSchema } from "../../schemas/lessonSchemas";
import { sendValidationError } from "../../utils/sendValidationError";

const createLessonController = async(req: Request, res: Response) => {
  const validationResult = createLessonSchema.safeParse(req.body);
  if (!validationResult.success) {
    return sendValidationError(res, validationResult.error);
  }

  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({
      success: false,
      data: null,
      message: "Unable to authenticate user"
    });
  }

  const result = await createLessonService({ ...validationResult.data, userId });

  return res.status(201).json({
    success: true,
    data: result,
    message: "Lesson created successfully"
  });
}

export default createLessonController;