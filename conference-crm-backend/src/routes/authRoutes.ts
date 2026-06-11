import { Router } from "express";

import {
  register,
  login,
} from "../controllers/authController";

const router = Router();

/**
 * Register User
 * POST /api/auth/register
 */
router.post(
  "/register",
  register
);

/**
 * Login User
 * POST /api/auth/login
 */
router.post(
  "/login",
  login
);

export default router;