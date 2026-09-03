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

  const result = await loginUserService({ email, password });

  if (!result.response.success) {
    return res.status(401).json(result.response);
  } 

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json(result.response);
};

export default loginUserController;