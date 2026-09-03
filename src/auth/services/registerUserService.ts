import prisma from "../../lib/prisma";
import { BaseResponse, RegisterUserInput, RegisterUserResponse } from '../types';
import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

const registerUserService = async({firstName, lastName, email, password}: RegisterUserInput): Promise<BaseResponse<RegisterUserResponse>> => {
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    return {
      success: false,
      data: null,
      message: "Email already exists"
    }
  };

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      passwordHash
    }
  });

  return {
    success: true,
    data: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    },
    message: "Registration successful"
  }
};

export default registerUserService;