import { Request, Response } from "express";
import { loginSchema } from "../../schemas/authSchemas";
import loginUserService from "../services/loginUserService";
import { sendValidationError } from "../../utils/sendValidationError";

const loginUserController = async (req: Request, res: Response) => {
  const validationResult = loginSchema.safeParse(req.body);
  if (!validationResult.success) {
    return sendValidationError(res, validationResult.error);
  }

  const { email, password} = validationResult.data;

  const response = await loginUserService({ email, password });

  if (!response.success) {
    return res.status(401).json(response);
  } 

  return res.status(200).json(response);
};

export default loginUserController;