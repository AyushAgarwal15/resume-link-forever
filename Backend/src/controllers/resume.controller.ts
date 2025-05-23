import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const updateResumeSlug = async (req: Request, res: Response) => {
  const { resumeSlug, userId } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const resume = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        resumeSlug: resumeSlug,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Resume slug updated",
      resume,
    });
  } catch (error) {
    console.error("Update resume slug error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getResume = async (req: Request, res: Response) => {
  const { resumeSlug } = req.params;
  const activeResume = await prisma.user.findUnique({
    where: { resumeSlug },
    select: {
      activeResumeId: true,
    },
  });
  if (!activeResume?.activeResumeId) {
    return res.status(404).json({
      success: false,
      message: "Resume not found",
    });
  }

  const resume = await prisma.resume.findUnique({
    where: { id: activeResume?.activeResumeId },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!resume) {
    return res.status(404).json({
      success: false,
      message: "Resume not found",
    });
  }
  return res.status(200).json({
    success: true,
    resume,
  });
};
