import { Response, Request, NextFunction } from "express";
import { sendValidationError } from "../../utils/sendValidationError";
import deleteLessonService from "../services/deleteLessonService";
import { deleteLessonSchema } from "../../schemas/lessonSchemas";

const deleteLessonController = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const validationResult = deleteLessonSchema.safeParse(req.params);
    if (!validationResult.success) {
      return sendValidationError(res, validationResult.error);
    }

    await deleteLessonService(validationResult.data.lessonId);

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export default deleteLessonController;