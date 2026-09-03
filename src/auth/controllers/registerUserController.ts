import { Request, Response } from "express";
import { registerSchema } from "../../schemas/authSchemas";
import registerUserService from "../services/registerUserService";
import { sendValidationError } from "../../utils/sendValidationError";

const registerUserController = async (req: Request, res: Response) => {
  const validationResult = registerSchema.safeParse(req.body);
  if (!validationResult.success) {
    return sendValidationError(res, validationResult.error);
  }

  const {firstName, lastName, email, password} = validationResult.data;

  const response = await registerUserService({ firstName, lastName, email, password });

  if (!response.success) {
    return res.status(409).json(response);
  } 

  return res.status(201).json(response);
};

export default registerUserController;