import prisma from "../../lib/prisma"
import { PublicUser } from "../../types/auth";

const getCurrentUserService = async( userId: string ): Promise<PublicUser | null> => {
  const user = await prisma.user.findUnique({
    where: {id: userId}
  });

  if (!user) {
    return null
  }

  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role
  }
};

export default getCurrentUserService;