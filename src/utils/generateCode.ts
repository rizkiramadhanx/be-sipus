import prisma from "@/libs/prismaClient";

const generateBookCode = async () => {
  let countAllBook = await prisma.book.count();

  if (countAllBook === 0) {
    countAllBook = 1;
  }
  const customId = `BK${String(countAllBook + 1).padStart(4, "0")}`;

  return customId;
};

const generateBookingCode = async () => {
  const number = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

  const isExist = await prisma.booking.findFirst({
    where: {
      code: number.toString(),
    },
  });

  if (isExist) {
    generateBookingCode();
  }

  return number.toString();
};

export { generateBookCode, generateBookingCode };
