import { NextFunction, Request, Response } from "express";
import { updateLessonParamsSchema, updateLessonBodySchema } from "../../schemas/lessonSchemas";
import { sendValidationError } from "../../utils/sendValidationError";
import updateLessonService from "../services/updateLessonService";

const updateLessonController = async(req: Request, res: Response, next: NextFunction) => {
   try {
    const validationParams = updateLessonParamsSchema.safeParse(req.params);
    if (!validationParams.success) {
      return sendValidationError(res, validationParams.error);
    }

    const validationBody = updateLessonBodySchema.safeParse(req.body);
    if (!validationBody.success) {
      return sendValidationError(res, validationBody.error);
    }

    const result = await updateLessonService({
      ...validationParams.data,
      ...validationBody.data
    });

    return res.status(200).json({
      success: true,
      data: result,
      message: "Lesson updated successfully"
    });
  } catch (error) {
    next(error);
  }
};

export default updateLessonController;