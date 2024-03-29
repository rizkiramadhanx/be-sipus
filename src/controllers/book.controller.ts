import { Response, Request } from "express";
import { CommonResponse } from "../types/common/Response";
import prisma from "../libs/prismaClient";
import { generateBookCode } from "../utils/generateCode";

interface getAllBookRequest {
  per_page: number;
  current_page: number;
}

const addBook = async (req: Request, res: Response<CommonResponse>) => {
  const { title, id_author, id_language } = req.body;

  const array_id_category: Array<number> = req.body.array_id_category;

  // @ts-ignore
  const email = req.id;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    const book = await prisma.book.create({
      data: {
        title: title,
        code: await generateBookCode(),
        User: {
          connect: {
            id_user: user?.id_user,
          },
        },
        Language: {
          connect: {
            id_language: parseInt(id_language),
          },
        },
        Author: {
          connect: {
            id_author: parseInt(id_author),
          },
        },
        Category: {
          connect:
            array_id_category.map((e: number) => ({
              id_category: e,
            })) || [],
        },
      },
      include: {
        User: {
          select: {
            name: true,
          },
        },
        Author: true,
        Language: true,
        Category: true,
      },
    });

    if (book) {
      return res.status(200).json({
        data: book,
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

const editBook = async (req: Request, res: Response<CommonResponse>) => {
  const { title, id_author, id_language } = req.body;
  const array_id_category: Array<number> = req.body.array_id_category;

  const { id } = req.params;

  try {
    const book = await prisma.book.update({
      where: {
        id_book: parseInt(id),
      },
      data: {
        title: title,
        id_language: parseInt(id_language),
        id_author: parseInt(id_author),
        Category: {
          connect:
            array_id_category.map((e: number) => ({
              id_category: e,
            })) || [],
        },
      },
      include: {
        Category: true,
      },
    });

    if (book) {
      return res.status(200).json({
        data: book,
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

const getAllBook = async (
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
    const countBook = await prisma.book.count();
    const book = await prisma.book.findMany({
      skip: per_pageToNumber * (current_pageToNumber - 1),
      take: per_pageToNumber,
      include: {
        Author: true,
        Language: true,
        User: {
          select: {
            name: true,
          },
        },
        Category: {
          select: {
            name: true,
          },
        },
      },
    });

    if (book) {
      return res.status(200).json({
        data: {
          pagination: {
            rows: countBook,
            per_page: current_pageToNumber,
            current_page: per_pageToNumber,
          },
          record: book,
        },
        error: null,
        message: "Data found",
        status: 200,
      });
    }

    if (!book) {
      return res.status(200).json({
        data: book,
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

const getBookById = async (req: Request, res: Response<CommonResponse>) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.findFirst({
      where: {
        id_book: parseInt(id),
      },
      include: {
        Author: true,
        Language: true,
        Category: true,
        User: {
          select: {
            name: true,
          },
        },
      },
    });

    if (book) {
      return res.status(200).json({
        data: book,
        error: null,
        message: "Data found",
        status: 200,
      });
    }

    if (!book) {
      return res.status(200).json({
        data: book,
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

const deleteBook = async (req: Request, res: Response<CommonResponse>) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.delete({
      where: {
        id_book: parseInt(id),
      },
    });

    if (book) {
      return res.status(200).json({
        data: book,
        error: null,
        message: "Data has been delete",
        status: 200,
      });
    }

    if (!book) {
      return res.status(400).json({
        data: book,
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

export { addBook, editBook, getAllBook, getBookById, deleteBook };
