import { Response, Request } from "express"
import logoutUserService from "../services/logoutUserService";

const logoutUserController = async(req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    await logoutUserService(refreshToken);
  }

  res.clearCookie("refreshToken");

  return res.status(200).json({
    success: true,
    data: null,
    message: "Logout successful"
  });
};

export default logoutUserController;