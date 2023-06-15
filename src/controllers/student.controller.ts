import prisma from "@/libs/prismaClient";
import { CommonResponse } from "@/types/common/Response";
import { Response, Request } from "express";

const addStudent = async (req: Request, res: Response<CommonResponse>) => {
  const { fullName, password, NIM } = req.body;

  try {
    const student = await prisma.student.create({
      data: {
        NIM: NIM,
        fullName: fullName,
        password: password,
      },
    });

    if (student) {
      return res.status(200).json({
        data: student,
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

const editStudent = async (req: Request, res: Response<CommonResponse>) => {
  const { fullName, password, NIM } = req.body;
  const { id } = req.params;

  try {
    const student = await prisma.student.update({
      where: {
        id_student: parseInt(id),
      },
      data: {
        fullName: fullName,
        NIM: NIM,
        password: password,
      },
    });

    if (student) {
      return res.status(200).json({
        data: student,
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

const getAllStudent = async (req: Request, res: Response<CommonResponse>) => {
  try {
    const student = await prisma.student.findMany({});

    if (student) {
      return res.status(200).json({
        data: student,
        error: null,
        message: "Data found",
        status: 200,
      });
    }

    if (!student) {
      return res.status(200).json({
        data: student,
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

const getStudentById = async (req: Request, res: Response<CommonResponse>) => {
  const { id } = req.params;
  try {
    const student = await prisma.student.findFirst({
      where: {
        id_student: parseInt(id),
      },
    });

    if (student) {
      return res.status(200).json({
        data: student,
        error: null,
        message: "Data found",
        status: 200,
      });
    }

    if (!student) {
      return res.status(200).json({
        data: student,
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

const deleteStudent = async (req: Request, res: Response<CommonResponse>) => {
  const { id } = req.params;
  try {
    const student = await prisma.student.delete({
      where: {
        id_student: parseInt(id),
      },
    });

    if (student) {
      return res.status(200).json({
        data: student,
        error: null,
        message: "Data has been delete",
        status: 200,
      });
    }

    if (!student) {
      return res.status(400).json({
        data: student,
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
  deleteStudent,
  editStudent,
  getAllStudent,
  getStudentById,
  addStudent,
};
