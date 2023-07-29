import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { faker } from "@faker-js/faker";

export const authorSeed = async (amount: number) => {
  await prisma.author.deleteMany();

  for (let index = 1; index < amount; index++) {
    await prisma.author.create({
      data: {
        fullName: faker.person.fullName(),
      },
    });
  }
};
