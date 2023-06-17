import prisma from "@/libs/prismaClient";

const generateBookCode = async () => {
  const findAllBook = await prisma.book.findMany();

  const intCode = findAllBook.map((book) => parseInt(book.code.slice(3)));

  let biggestCode = Math.max(...intCode);

  if (!findAllBook[0]) {
    biggestCode = 0;
  }
  const customId = `BK${String(biggestCode + 1).padStart(4, "0")}`;

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
