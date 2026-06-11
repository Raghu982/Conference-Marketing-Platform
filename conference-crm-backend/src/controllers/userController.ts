import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { prisma } from "../prisma/client";

export const createUser = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      email,
      role,
    } = req.body;

    const existingUser =
      await prisma.user.findUnique({
        where: { email },
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        "password123",
        10
      );

    const user =
      await prisma.user.create({
        data: {
          name,
          email,
          role,
          password:
            hashedPassword,
        },
      });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to create user",
    });
  }
};

export const getUsers = async (
  req: Request,
  res: Response
) => {
  try {
    const users =
      await prisma.user.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    res.json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to fetch users",
    });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(
      req.params.id
    );

    const user =
      await prisma.user.findUnique({
        where: { id },
      });

    if (!user) {
      return res.status(404).json({
        message:
          "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to fetch user",
    });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(
      req.params.id
    );

    const {
      name,
      email,
      role,
    } = req.body;

    const user =
      await prisma.user.update({
        where: { id },
        data: {
          name,
          email,
          role,
        },
      });

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to update user",
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(
      req.params.id
    );

    await prisma.user.delete({
      where: { id },
    });

    res.json({
      message:
        "User deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to delete user",
    });
  }
};