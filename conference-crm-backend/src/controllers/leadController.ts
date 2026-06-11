import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getLeads = async (
  req: Request,
  res: Response
) => {
  const leads = await prisma.lead.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json(leads);
};

export const createLead = async (
  req: Request,
  res: Response
) => {
  const lead = await prisma.lead.create({
    data: req.body,
  });

  res.json(lead);
};

export const updateLead = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  const lead = await prisma.lead.update({
    where: { id },
    data: req.body,
  });

  res.json(lead);
};

export const deleteLead = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  await prisma.lead.delete({
    where: { id },
  });

  res.json({
    message: "Lead deleted",
  });
};