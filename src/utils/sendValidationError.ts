import { ZodError } from 'zod';
import { Response } from 'express';

export const sendValidationError = (
  res: Response,
  error: ZodError
) => {
  return res.status(400).json({
    success: false,
    data: error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    })),
    message: "Validation failed"
  });
}