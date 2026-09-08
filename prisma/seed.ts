import "dotenv/config";
import bcrypt from "bcrypt";
import prisma from "../src/lib/prisma";
import { UserRole } from "../src/generated/prisma/enums";

const main = async () => {
  const adminPassword = process.env.KAWE_SEED_ADMIN_PASSWORD;
  const instructorPassword = process.env.KAWE_SEED_INSTRUCTOR_PASSWORD;

  if (!adminPassword || !instructorPassword) {
    throw new Error("Seed passwords are not configured");
  }

  const adminPasswordHash = await bcrypt.hash(adminPassword, 10);
  const instructorPasswordHash = await bcrypt.hash(instructorPassword, 10);

  const users = [
    {
      firstName: "Kàwé",
      lastName: "Admin",
      email: "admin@kawe.dev",
      passwordHash: adminPasswordHash,
      role: UserRole.ADMIN,
    },
    {
      firstName: "Kàwé",
      lastName: "Instructor",
      email: "instructor@kawe.dev",
      passwordHash: instructorPasswordHash,
      role: UserRole.INSTRUCTOR,
    },
  ];

  for (const user of users) {
    const seededUser = await prisma.user.upsert({
      where: {email: user.email},
      update: {},
      create: user
    });

    console.log(`Seeded ${seededUser.role}: ${seededUser.email}`);
  }
};

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });