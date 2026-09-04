import { Response, Request } from "express";
import getCurrentUserService from "../services/getCurrentUserService";

const getCurrentUserController = async(req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({
      success: false,
      data: null,
      message: "Unable to authenticate user"
    });
  }

  const result = await getCurrentUserService(userId);

  if (!result) {
    return res.status(404).json({
      success: false,
      data: null,
      message: "User not found"
    })
  }

  return res.status(200).json({
    success: true,
    data: result,
    message: "Profile fetched successfully"
  });
}

export default getCurrentUserController;