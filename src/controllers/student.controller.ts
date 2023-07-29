import prisma from "@/libs/prismaClient";
import { CommonResponse } from "@/types/common/Response";
import { Response, Request } from "express";

interface getAllStudentRequest {
  per_page: number;
  current_page: number;
}

const addStudent = async (req: Request, res: Response<CommonResponse>) => {
  const { fullName, phone, NIM } = req.body;

  try {
    const student = await prisma.student.create({
      data: {
        NIM: parseInt(NIM),
        fullName: fullName,
        phone: phone,
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
  const { fullName, phone, NIM } = req.body;
  const { id } = req.params;

  try {
    const student = await prisma.student.update({
      where: {
        id_student: parseInt(id),
      },
      data: {
        fullName: fullName,
        NIM: parseInt(NIM),
        phone: phone,
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

const getAllStudent = async (
  req: Request<{}, {}, {}, getAllStudentRequest>,
  res: Response<CommonResponse>
) => {
  const { per_page = 10, current_page = 1 } = req.query;

  const per_pageToNumber = Number(per_page);
  const current_pageToNumber = Number(current_page);

  if (isNaN(per_pageToNumber) || isNaN(current_pageToNumber)) {
    new Error();
  }

  try {
    const countStudent = await prisma.student.count();
    const student = await prisma.student.findMany({});

    if (student) {
      return res.status(200).json({
        data: {
          pagination: {
            rows: countStudent,
            per_page: current_pageToNumber,
            current_page: per_pageToNumber,
          },
          record: student,
        },
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
