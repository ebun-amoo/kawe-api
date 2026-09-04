import prisma from "../../lib/prisma";
import { generateRefreshToken, hashRefreshToken } from "../../utils/refreshTokenUtils";
import { generateAccessToken } from "../../utils/tokenUtils";
import { LoginServiceResult, LoginUserInput } from '../../types/auth';
import bcrypt from 'bcrypt';

const loginUserService = async({ email, password }: LoginUserInput): Promise<LoginServiceResult> => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    return {
      response: {
        success: false,
        data: null,
        message: "Invalid credentials",
      },
      refreshToken: null,
    };
  };

  const validPassword = await bcrypt.compare(password, user.passwordHash);

  if (!validPassword) {
    return {
      response: {
        success: false,
        data: null,
        message: "Invalid credentials",
      },
      refreshToken: null,
    };
  };

  const accessToken = generateAccessToken(user.id, user.role);

  const refreshToken = generateRefreshToken();
  const tokenHash = hashRefreshToken(refreshToken);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt
    }
  })

  return {
    response: {
      success: true,
      data: {
        accessToken,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      },
      message: "Login successful"
    },
    refreshToken
  }
};

export default loginUserService;