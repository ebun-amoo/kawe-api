import prisma from "../../lib/prisma";
import { hashRefreshToken } from "../../utils/refreshTokenUtils"

const logoutUserService = async (refreshToken: string) => {
  const tokenHash = hashRefreshToken(refreshToken);

  const token = await prisma.refreshToken.findFirst({
    where: { tokenHash }
  });

  if (token) {
    await prisma.refreshToken.update({
      where: {id: token.id},
      data: {
        revokedAt: new Date()
      }
    });
  }

  return {
    success: true,
    message: "Logout successful"
  }
};

export default logoutUserService;