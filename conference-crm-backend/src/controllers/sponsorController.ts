import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getSponsors = async (
  req: Request,
  res: Response
) => {
  const sponsors =
    await prisma.sponsor.findMany({
      orderBy: {
        id: "desc",
      },
    });

  res.json(sponsors);
};

export const createSponsor = async (
  req: Request,
  res: Response
) => {
  const {
    name,
    tier,
    amount,
    status,
  } = req.body;

  const sponsor =
    await prisma.sponsor.create({
      data: {
        name,
        tier,
        amount,
        status,
      },
    });

  res.json(sponsor);
};

export const updateSponsor = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  const sponsor =
    await prisma.sponsor.update({
      where: { id },
      data: req.body,
    });

  res.json(sponsor);
};

export const deleteSponsor = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  await prisma.sponsor.delete({
    where: { id },
  });

  res.json({
    message:
      "Sponsor deleted",
  });
};