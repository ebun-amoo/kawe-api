import { Response, Request, NextFunction } from "express";
import getALessonService from "../services/getALessonService";
import { sendValidationError } from "../../utils/sendValidationError";
import { getLessonSchema } from "../../schemas/lessonSchemas";

const getALessonController = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const validationResult = getLessonSchema.safeParse(req.params);
    if (!validationResult.success) {
      return sendValidationError(res, validationResult.error);
    }
    const result = await getALessonService(validationResult.data.lessonId);

    if (!result) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Lesson not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
      message: "Lesson retrieved successfully"
    });
  } catch (error) {
    next(error);
  }
}

export default getALessonController;