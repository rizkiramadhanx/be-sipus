import prisma from "@/libs/prismaClient";
import { CommonResponse } from "@/types/common/Response";
import { Response, Request } from "express";

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

const getAllCategory = async (req: Request, res: Response<CommonResponse>) => {
  // add pagination
  // query search, sort by date

  try {
    const category = await prisma.category.findMany({});

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
