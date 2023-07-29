import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const categorySeed = async (amount: number) => {
  await prisma.category.deleteMany();

  for (let index = 1; index < amount; index++) {
    await prisma.category.create({
      data: {
        name: `Category ${index}`,
      },
    });
  }
};
