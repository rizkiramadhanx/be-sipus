import prisma from "@/libs/prismaClient";
import { CommonResponse } from "@/types/common/Response";
import { Response, Request } from "express";

interface getAllLanguageRequest {
  per_page: number;
  current_page: number;
}

const addLanguage = async (req: Request, res: Response<CommonResponse>) => {
  const { name } = req.body;

  try {
    const language = await prisma.language.create({
      data: {
        name: name,
      },
    });

    if (language) {
      return res.status(200).json({
        data: language,
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

const editLanguage = async (req: Request, res: Response<CommonResponse>) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    const language = await prisma.language.update({
      where: {
        id_language: parseInt(id),
      },
      data: {
        name: name,
      },
    });

    if (language) {
      return res.status(200).json({
        data: language,
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

const getAllLanguage = async (
  req: Request<{}, {}, {}, getAllLanguageRequest>,
  res: Response<CommonResponse>
) => {
  const { per_page = 10, current_page = 1 } = req.query;

  const per_pageToNumber = Number(per_page);
  const current_pageToNumber = Number(current_page);

  if (isNaN(per_pageToNumber) || isNaN(current_pageToNumber)) {
    new Error();
  }

  try {
    const countLanguage = await prisma.category.count();
    const language = await prisma.language.findMany({});

    if (language) {
      return res.status(200).json({
        data: {
          pagination: {
            rows: countLanguage,
            per_page: current_pageToNumber,
            current_page: per_pageToNumber,
          },
          record: language,
        },
        error: null,
        message: "Data found",
        status: 200,
      });
    }

    if (!language) {
      return res.status(200).json({
        data: language,
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

const getLanguageById = async (req: Request, res: Response<CommonResponse>) => {
  const { id } = req.params;
  try {
    const language = await prisma.language.findFirst({
      where: {
        id_language: parseInt(id),
      },
    });

    if (language) {
      return res.status(200).json({
        data: language,
        error: null,
        message: "Data found",
        status: 200,
      });
    }

    if (!language) {
      return res.status(200).json({
        data: language,
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

const deleteLanguage = async (req: Request, res: Response<CommonResponse>) => {
  const { id } = req.params;
  try {
    const language = await prisma.language.delete({
      where: {
        id_language: parseInt(id),
      },
    });

    if (language) {
      return res.status(200).json({
        data: language,
        error: null,
        message: "Data has been delete",
        status: 200,
      });
    }

    if (!language) {
      return res.status(400).json({
        data: language,
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

export {
  addLanguage,
  editLanguage,
  getAllLanguage,
  getLanguageById,
  deleteLanguage,
};
