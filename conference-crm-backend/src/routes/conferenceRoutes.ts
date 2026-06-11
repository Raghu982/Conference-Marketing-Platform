import { Router } from "express";

import {
  getConferences,
  createConference,
  updateConference,
  deleteConference,
} from "../controllers/conferenceController";

const router = Router();

router.get("/", getConferences);

router.post("/", createConference);

router.put("/:id", updateConference);

router.delete("/:id", deleteConference);

export default router;