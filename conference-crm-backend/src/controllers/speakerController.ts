import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getSpeakers = async (
  _req: Request,
  res: Response
) => {
  try {
    const speakers =
      await prisma.speaker.findMany({
        orderBy: {
          id: "desc",
        },
      });

    res.json(speakers);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch speakers",
    });
  }
};

export const createSpeaker = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      company,
      topic,
      status,
    } = req.body;

    const speaker =
      await prisma.speaker.create({
        data: {
          name,
          company,
          topic,
          status: status || "Pending",
        },
      });

    res.status(201).json(speaker);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create speaker",
    });
  }
};

export const updateSpeaker = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const {
      name,
      company,
      topic,
      status,
    } = req.body;

    const speaker =
      await prisma.speaker.update({
        where: { id },
        data: {
          name,
          company,
          topic,
          status,
        },
      });

    res.json(speaker);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update speaker",
    });
  }
};

export const deleteSpeaker = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    await prisma.speaker.delete({
      where: { id },
    });

    res.json({
      message: "Speaker deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete speaker",
    });
  }
};