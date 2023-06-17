import { Response, Request } from "express";
import { CommonResponse } from "@/types/common/Response";
import prisma from "@/libs/prismaClient";

const addBorrow = async (req: Request, res: Response<CommonResponse>) => {
  const { id_student, id_booking } = req.body;

  try {
    const addBorrowOnstudent = await prisma.student.update({
      where: {
        id_student: 5,
      },
      data: {
        Borrow: {
          create: {
            borrow_date: new Date(1686803959),
            Booking: {
              connect: {
                id_booking: 2,
              },
            },
          },
        },
      },
    });

    if (addBorrowOnstudent) {
      await prisma.booking.update({
        where: {
          id_booking: 2,
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

const editBorrow = async (req: Request, res: Response<CommonResponse>) => {};

const getAllBorrow = async (req: Request, res: Response<CommonResponse>) => {
  try {
    const borrow = await prisma.borrow.findMany({
      include: {
        Booking: true,
        Student: true,
      },
    });
    if (borrow) {
      return res.status(200).json({
        data: borrow,
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

export { addBorrow, editBorrow, getAllBorrow };
