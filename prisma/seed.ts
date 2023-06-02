import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

async function main() {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = (password: string) => bcrypt.hashSync(password, salt);
  await prisma.user.createMany({
    data: [
      {
        email: "admin@gmail.com",
        password: hashedPassword("password123"),
        name: "Mr Admin",
        role: "ADMIN",
      },
      {
        email: "user@gmail.com",
        password: hashedPassword("password123"),
        name: "Mr User",
        role: "USER",
      },
      {
        email: "employee@gmail.com",
        password: hashedPassword("password123"),
        name: "Mr. Employee ",
        role: "EMPLOYEE",
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
