import { Response, Request } from "express";
import { CommonResponse } from "../types/common/Response";
import prisma from "../libs/prismaClient";

interface getAllBookRequest {
  per_page: number;
  current_page: number;
}

const addAuthor = async (req: Request, res: Response<CommonResponse>) => {
  const { fullName } = req.body;

  try {
    const author = await prisma.author.create({
      data: {
        fullName: fullName,
      },
    });

    if (author) {
      return res.status(200).json({
        data: author,
        error: null,
        message: "Data has been create",
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

const editAuthor = async (req: Request, res: Response<CommonResponse>) => {
  const { fullName } = req.body;
  const { id } = req.params;

  try {
    const author = await prisma.author.update({
      where: {
        id_author: parseInt(id),
      },
      data: {
        fullName: fullName,
      },
    });

    if (author) {
      return res.status(200).json({
        data: author,
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

const getAllAuthor = async (
  req: Request<{}, {}, {}, getAllBookRequest>,
  res: Response<CommonResponse>
) => {
  const { per_page = 10, current_page = 1 } = req.query;

  const per_pageToNumber = Number(per_page);
  const current_pageToNumber = Number(current_page);

  if (isNaN(per_pageToNumber) || isNaN(current_pageToNumber)) {
    new Error();
  }

  try {
    const countAuthor = await prisma.author.count();
    const author = await prisma.author.findMany({
      skip: per_pageToNumber * (current_pageToNumber - 1),
      take: per_pageToNumber,
    });

    if (author) {
      return res.status(200).json({
        data: {
          pagination: {
            rows: countAuthor,
            per_page: current_pageToNumber,
            current_page: per_pageToNumber,
          },
          record: author,
        },
        error: null,
        message: "Data found",
        status: 200,
      });
    }

    if (!author) {
      return res.status(200).json({
        data: author,
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

const getAuthorById = async (req: Request, res: Response<CommonResponse>) => {
  const { id } = req.params;
  try {
    const author = await prisma.author.findFirst({
      where: {
        id_author: parseInt(id),
      },
    });

    if (author) {
      return res.status(200).json({
        data: author,
        error: null,
        message: "Data found",
        status: 200,
      });
    }

    if (!author) {
      return res.status(200).json({
        data: author,
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

const deleteAuthor = async (req: Request, res: Response<CommonResponse>) => {
  const { id } = req.params;
  try {
    const author = await prisma.author.delete({
      where: {
        id_author: parseInt(id),
      },
    });

    if (author) {
      return res.status(200).json({
        data: author,
        error: null,
        message: "Data has been delete",
        status: 200,
      });
    }

    if (!author) {
      return res.status(400).json({
        data: author,
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

export { addAuthor, editAuthor, getAllAuthor, getAuthorById, deleteAuthor };
