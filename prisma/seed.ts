import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import { categorySeed } from "./faker/category.seed";
import { authorSeed } from "./faker/author.seed";

async function main() {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = (password: string) => bcrypt.hashSync(password, salt);

  await prisma.user.deleteMany();
  await prisma.language.deleteMany();
  await prisma.author.deleteMany();

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

  // await prisma.author.createMany({
  //   data: [
  //     {
  //       fullName: "Andrea Hirata",
  //     },
  //     {
  //       fullName: "Tere Liye",
  //     },
  //     {
  //       fullName: "Raditya Dika",
  //     },
  //   ],
  // });

  await prisma.language.createMany({
    data: [
      {
        name: "Indonesia",
      },
      {
        name: "Inggris",
      },
      {
        name: "Jawa",
      },
    ],
  });

  categorySeed(7);
  authorSeed(10);
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
