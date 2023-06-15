import { Response, Request } from "express";
import { CommonResponse } from "@/types/common/Response";
import prisma from "@/libs/prismaClient";
import { generateBookingCode } from "@/utils/generateCode";

const addBooking = async (req: Request, res: Response<CommonResponse>) => {
  const { id_book } = req.body;

  try {
    const booking = await prisma.booking.create({
      data: {
        status: false,
        code: await generateBookingCode(),
        id_book: id_book,
      },
    });

    if (booking) {
      return res.status(200).json({
        data: booking,
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

const getAllBooking = async (req: Request, res: Response<CommonResponse>) => {
  try {
    const booking = await prisma.booking.findMany({});

    if (booking) {
      return res.status(200).json({
        data: booking,
        error: null,
        message: "Data found",
        status: 200,
      });
    }

    if (!booking) {
      return res.status(200).json({
        data: booking,
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
const getBookingById = async (req: Request, res: Response<CommonResponse>) => {
  const { id } = req.params;
  try {
    const booking = await prisma.booking.findFirst({
      where: {
        booking_id: Number(id),
      },
      include: {
        Book: true,
      },
    });

    if (booking) {
      return res.status(200).json({
        data: booking,
        error: null,
        message: "Data found",
        status: 200,
      });
    }

    if (!booking) {
      return res.status(200).json({
        data: booking,
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

const deleteBooking = async (req: Request, res: Response<CommonResponse>) => {
  const { id } = req.params;

  try {
    const booking = await prisma.booking.delete({
      where: {
        booking_id: parseInt(id),
      },
    });

    if (booking) {
      return res.status(200).json({
        data: booking,
        error: null,
        message: "Data has been delete",
        status: 200,
      });
    }

    if (!booking) {
      return res.status(400).json({
        data: booking,
        error: null,
        message: "Failed to delete",
        status: 400,
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

export { addBooking, getAllBooking, getBookingById, deleteBooking };
