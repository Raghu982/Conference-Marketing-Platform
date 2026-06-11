import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getNotifications = async (
  req: Request,
  res: Response
) => {
  const notifications =
    await prisma.notification.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  res.json(notifications);
};

export const createNotification = async (
  req: Request,
  res: Response
) => {
  const notification =
    await prisma.notification.create({
      data: req.body,
    });

  res.json(notification);
};

export const markAsRead = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  const notification =
    await prisma.notification.update({
      where: { id },
      data: {
        isRead: true,
      },
    });

  res.json(notification);
};

export const deleteNotification = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  await prisma.notification.delete({
    where: { id },
  });

  res.json({
    message: "Notification deleted",
  });
};