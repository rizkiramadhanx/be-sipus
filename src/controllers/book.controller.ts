import prisma from "@/libs/prismaClient";
import { CommonResponse } from "@/types/common/Response";
import { Response, Request } from "express";

const addBook = async (req: Request, res: Response<CommonResponse>) => {
  const { title, id_author, id_language, id_category, category_name } =
    req.body;

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
        User: {
          connect: {
            id_user: 2,
          },
        },
        Language: {
          connect: {
            id_language: 2,
          },
        },
        Author: {
          connect: {
            id_author: 2,
          },
        },
      },
      include: {
        User: true,
        Author: true,
        Language: true,
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

  const { id } = req.params;

  try {
    const book = await prisma.book.update({
      where: {
        id_book: parseInt(id),
      },
      data: {
        title: title,
        id_language: id_language,
        id_author: id_author,
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

const getAllBook = async (req: Request, res: Response<CommonResponse>) => {
  // add pagination
  // query search, sort by date

  try {
    const book = await prisma.book.findMany({
      include: {
        Author: true,
        Language: true,
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