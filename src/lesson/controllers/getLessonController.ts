import { Response, Request, NextFunction } from "express";
import getLessonService from "../services/getLessonService";

const getLessonController = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getLessonService();

    return res.status(200).json({
      success: true,
      data: result,
      message: "Lessons retrieved successfully"
    });
  } catch (error) {
    next(error);
  }
}

export default getLessonController;