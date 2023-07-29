import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const languageSeed = async (amount: number) => {
  await prisma.language.deleteMany();

  for (let index = 1; index < amount; index++) {
    await prisma.language.create({
      data: {
        name: `Bahasa ${index}`,
      },
    });
  }
};
