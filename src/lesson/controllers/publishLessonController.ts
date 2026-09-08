import { NextFunction, Request, Response } from "express";
import { publishLessonParamsSchema, publishLessonBodySchema } from "../../schemas/lessonSchemas";
import { sendValidationError } from "../../utils/sendValidationError";
import publishLessonService from "../services/publishLessonService";

const publishLessonController = async(req: Request, res: Response, next: NextFunction) => {
   try {
    const validationParams = publishLessonParamsSchema.safeParse(req.params);
    if (!validationParams.success) {
      return sendValidationError(res, validationParams.error);
    }

    const validationBody = publishLessonBodySchema.safeParse(req.body);
    if (!validationBody.success) {
      return sendValidationError(res, validationBody.error);
    }

    const result = await publishLessonService({
      ...validationParams.data,
      ...validationBody.data
    });

    return res.status(200).json({
      success: true,
      data: result,
      message: validationBody.data.isPublished
        ? "Lesson published successfully"
        : "Lesson unpublished successfully"
    });
  } catch (error) {
    next(error);
  }
};

export default publishLessonController;