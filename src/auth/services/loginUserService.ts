import prisma from "../../lib/prisma";
import { generateAccessToken } from "../../utils/tokenUtils";
import { BaseResponse, LoginUserInput, LoginUserResponse } from '../types';
import bcrypt from 'bcrypt';

const loginUserService = async({ email, password }: LoginUserInput): Promise<BaseResponse<LoginUserResponse>> => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    return {
      success: false,
      data: null,
      message: "Invalid credentials"
    }
  };

  const validPassword = await bcrypt.compare(password, user.passwordHash);

  if (!validPassword) {
    return {
      success: false,
      data: null,
      message: "Invalid credentials"
    }
  };

  const accessToken = generateAccessToken(user.id, user.role);

  return {
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
  }
};

export default loginUserService;