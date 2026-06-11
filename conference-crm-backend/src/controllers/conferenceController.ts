import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getConferences = async (
  _req: Request,
  res: Response
) => {
  try {
    const conferences =
      await prisma.conference.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    res.json(conferences);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch conferences",
    });
  }
};

export const createConference = async (
  req: Request,
  res: Response
) => {
  try {
    const conference =
      await prisma.conference.create({
        data: req.body,
      });

    await prisma.notification.create({
      data: {
        title: "New Conference Added",
        message: `${conference.name} created`,
        type: "conference",
      },
    });

    res.status(201).json(conference);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create conference",
    });
  }
};
       

export const updateConference = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const conference =
      await prisma.conference.update({
        where: { id },
        data: req.body,
      });

    res.json(conference);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update conference",
    });
  }
};

export const deleteConference = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    await prisma.conference.delete({
      where: { id },
    });

    res.json({
      message: "Conference deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete conference",
    });
  }
};