import prisma from "@/libs/prismaClient";

const generateBookCode = async () => {
  const countAllBook = await prisma.book.count();
  const customId = `BK${String(countAllBook + 1).padStart(4, "0")}`;

  return customId;
};

export { generateBookCode };
