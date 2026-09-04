import prisma from "../../lib/prisma";
import { generateRefreshToken, hashRefreshToken } from "../../utils/refreshTokenUtils";
import { generateAccessToken } from "../../utils/tokenUtils";

const refreshAccessTokenService = async(refreshToken: string) => {
  const tokenHash = hashRefreshToken(refreshToken);
  const token = await prisma.refreshToken.findFirst({
    where : { tokenHash },
    include: { user: true }
  });

  if (!token) {
    return {
      success: false,
      data: null,
      message: "Invalid token"
    }
  };

  if (token.revokedAt || token.expiresAt < new Date()) {
    return {
      success: false,
      data: null,
      message: "Invalid or expired refresh token"
    }
  }

  const user = token.user;
  const accessToken = generateAccessToken(user.id, user.role);
  const newRefreshToken = generateRefreshToken();
  const newTokenHash = hashRefreshToken(newRefreshToken);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await prisma.$transaction(async (tsx) => {
    const newToken = await tsx.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: newTokenHash,
        expiresAt
      }
    });

    await tsx.refreshToken.update({
      where: { id: token.id },
      data: { 
        revokedAt: new Date(), 
        replacedByTokenId: newToken.id
      }
    });
  });

  return {
    success: true,
    data: {
      accessToken,
      refreshToken: newRefreshToken
    },
    message: "Token refreshed"
  }
};

export default refreshAccessTokenService;