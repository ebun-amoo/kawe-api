import { Request, Response, NextFunction } from "express";
import { Prisma } from "../generated/prisma/client";

const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Lesson not found"
      });
    }

    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        data: null,
        message: "A resource with these details already exists"
      });
    }
  }
  return res.status(500).json({
    success: false,
    data: null,
    message: "Internal server error"
  });
};

export default errorHandler;