import refreshAccessTokenService from '../services/refreshAccessTokenService';
import { Request, Response } from 'express';

const refreshAccessTokenController = async(req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      data: null,
      message: "Refresh token is required"
    });
  }

  const result = await refreshAccessTokenService(refreshToken);

  if (!result.success) {
    return res.status(401).json({
      success: false,
      data: null,
      message: "Unable to refresh token"
    });
  }

  res.cookie("refreshToken", result.data?.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    data: {
      accessToken: result.data?.accessToken
    },
    message: "Token refreshed successfully"
  })
};

export default refreshAccessTokenController;