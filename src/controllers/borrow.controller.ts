import { Response, Request } from "express";
import { CommonResponse } from "../types/common/Response";
import prisma from "../libs/prismaClient";


interface getAllBorrowRequest {
  per_page: number;
  current_page: number;
}

const addBorrow = async (req: Request, res: Response<CommonResponse>) => {
  const { id_student, id_booking } = req.body;

  const isBorrowBooking = await prisma.booking.findFirst({
    where: {
      id_booking: parseInt(id_booking),
      status: true,
    },
  });

  if (isBorrowBooking) {
    return res.status(400).json({
      message: "Has borrow",
      data: null,
      error: true,
      status: 400,
    });
  }

  try {
    const addBorrowOnstudent = await prisma.student.update({
      where: {
        id_student: parseInt(id_student),
      },
      data: {
        Borrow: {
          create: {
            status: "DIPINJAM",
            borrow_date: new Date(Date.now()),
            Booking: {
              connect: {
                id_booking: parseInt(id_booking),
              },
            },
          },
        },
      },
    });

    if (addBorrowOnstudent) {
      await prisma.booking.update({
        where: {
          id_booking: parseInt(id_booking),
        },
        data: {
          status: true,
        },
      });

      return res.status(200).json({
        data: addBorrowOnstudent,
        error: null,
        message: "Data add",
        status: 200,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Error has found",
      data: null,
      error: error,
      status: 400,
    });
  }
};

const returnBorrow = async (req: Request, res: Response<CommonResponse>) => {
  const { id_booking } = req.body;
  const { id } = req.params;

  try {
    const isValidToReturn = await prisma.borrow.findFirst({
      where: {
        id_booking: parseInt(id_booking),
        status: "DIPINJAM",
      },
    });

    if (isValidToReturn) {
      return res.status(400).json({
        message: "Book not yet borrow",
        data: null,
        error: true,
        status: 400,
      });
    }

    const result = await prisma.$transaction([
      prisma.booking.update({
        where: { id_booking: parseInt(id_booking) },
        data: {
          status: false,
        },
      }),
      prisma.borrow.update({
        where: {
          id_borrow: parseInt(id),
        },
        data: {
          return_date: new Date(Date.now()),
          status: "DIKEMBALIKAN",
        },
      }),
    ]);

    return res.status(200).json({
      data: result,
      error: null,
      message: "Return book is updated",
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error has found",
      data: null,
      error: error,
      status: 400,
    });
  }
};

const getAllBorrow = async (
  req: Request<{}, {}, {}, getAllBorrowRequest>,
  res: Response<CommonResponse>
) => {
  const { per_page = 10, current_page = 1 } = req.query;

  const per_pageToNumber = Number(per_page);
  const current_pageToNumber = Number(current_page);

  if (isNaN(per_pageToNumber) || isNaN(current_pageToNumber)) {
    new Error();
  }
  try {
    const countBorrrow = await prisma.borrow.count();
    const borrow = await prisma.borrow.findMany({
      skip: per_pageToNumber * (current_pageToNumber - 1),
      take: per_pageToNumber,
      include: {
        Booking: {
          include: {
            Book: true,
          },
        },
        Student: true,
      },
    });

    if (borrow) {
      return res.status(200).json({
        data: {
          pagination: {
            rows: countBorrrow,
            per_page: current_pageToNumber,
            current_page: per_pageToNumber,
          },
          record: borrow,
        },
        error: null,
        message: "Data found",
        status: 200,
      });
    }

    if (!borrow[0]) {
      return res.status(200).json({
        data: borrow,
        error: null,
        message: "Data not found",
        status: 200,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Error has found",
      data: null,
      error: error,
      status: 400,
    });
  }
};

export { addBorrow, returnBorrow, getAllBorrow };
