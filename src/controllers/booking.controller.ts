import { Response, Request } from "express";
import { CommonResponse } from "@/types/common/Response";
import prisma from "@/libs/prismaClient";
import { generateBookCode, generateBookingCode } from "@/utils/generateCode";

interface getAllBookingRequest {
  per_page: number;
  current_page: number;
  status: boolean;
}

const addBooking = async (req: Request, res: Response<CommonResponse>) => {
  const { id_book, code } = req.body;

  try {
    const booking = await prisma.booking.create({
      data: {
        status: false,
        code: code || (await generateBookingCode()),
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

const getAllBooking = async (
  req: Request<{}, {}, {}, getAllBookingRequest>,
  res: Response<CommonResponse>
) => {
  const { per_page = 10, current_page = 1 } = req.query;

  const per_pageToNumber = Number(per_page);
  const current_pageToNumber = Number(current_page);

  if (isNaN(per_pageToNumber) || isNaN(current_pageToNumber)) {
    new Error();
  }

  const { status } = req.query;

  let where = {};

  if (status) {
    where = {
      NOT: {
        status: status,
      },
    };
  }

  try {
    const countBooking = await prisma.booking.count();

    const booking = await prisma.booking.findMany({
      skip: per_pageToNumber * (current_pageToNumber - 1),
      take: per_pageToNumber,
      where: where,
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
        data: {
          pagination: {
            rows: countBooking,
            per_page: current_pageToNumber,
            current_page: per_pageToNumber,
          },
          record: booking,
        },
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
        id_booking: Number(id),
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
        id_booking: parseInt(id),
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

const editBooking = async (req: Request, res: Response<CommonResponse>) => {
  const { id_book, code } = req.body;

  const { id } = req.params;

  try {
    const booking = await prisma.booking.update({
      where: {
        id_booking: parseInt(id),
      },
      data: {
        code: code,
        id_book: parseInt(id_book),
      },
    });

    if (booking) {
      return res.status(200).json({
        data: booking,
        error: null,
        message: "Data has been update",
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

export {
  addBooking,
  getAllBooking,
  getBookingById,
  deleteBooking,
  editBooking,
};
