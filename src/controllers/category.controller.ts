import { Response, Request } from "express";
import { CommonResponse } from "../types/common/Response";
import prisma from "../libs/prismaClient";

interface getAllCategoryRequest {
  per_page: number;
  current_page: number;
}

const addCategory = async (req: Request, res: Response<CommonResponse>) => {
  const { name } = req.body;

  try {
    const category = await prisma.category.create({
      data: {
        name: name,
      },
    });

    if (category) {
      return res.status(200).json({
        data: category,
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

const editCategory = async (req: Request, res: Response<CommonResponse>) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    const category = await prisma.category.update({
      where: {
        id_category: parseInt(id),
      },
      data: {
        name: name,
      },
    });

    if (category) {
      return res.status(200).json({
        data: category,
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

const getAllCategory = async (
  req: Request<{}, {}, {}, getAllCategoryRequest>,
  res: Response<CommonResponse>
) => {
  const { per_page = 10, current_page = 1 } = req.query;

  const per_pageToNumber = Number(per_page);
  const current_pageToNumber = Number(current_page);

  if (isNaN(per_pageToNumber) || isNaN(current_pageToNumber)) {
    new Error();
  }

  try {
    const countCategory = await prisma.category.count();
    const category = await prisma.category.findMany({
      skip: per_pageToNumber * (current_pageToNumber - 1),
      take: per_pageToNumber,
    });

    if (category) {
      return res.status(200).json({
        data: {
          pagination: {
            rows: countCategory,
            per_page: current_pageToNumber,
            current_page: per_pageToNumber,
          },
          record: category,
        },
        error: null,
        message: "Data found",
        status: 200,
      });
    }

    if (!category) {
      return res.status(200).json({
        data: category,
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

const getCategoryById = async (req: Request, res: Response<CommonResponse>) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.findFirst({
      where: {
        id_category: parseInt(id),
      },
    });

    if (category) {
      return res.status(200).json({
        data: category,
        error: null,
        message: "Data found",
        status: 200,
      });
    }

    if (!category) {
      return res.status(200).json({
        data: category,
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

const deleteCategory = async (req: Request, res: Response<CommonResponse>) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.delete({
      where: {
        id_category: parseInt(id),
      },
    });

    if (category) {
      return res.status(200).json({
        data: category,
        error: null,
        message: "Data has been delete",
        status: 200,
      });
    }

    if (!category) {
      return res.status(400).json({
        data: category,
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
  addCategory,
  editCategory,
  getAllCategory,
  getCategoryById,
  deleteCategory,
};
