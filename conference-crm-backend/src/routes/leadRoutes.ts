import express from "express";

import {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
} from "../controllers/leadController";

const router = express.Router();

router.get("/", getLeads);

router.post("/", createLead);

router.put("/:id", updateLead);

router.delete("/:id", deleteLead);

export default router;