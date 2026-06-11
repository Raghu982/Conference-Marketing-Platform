import { Router } from "express";

import {
  getSponsors,
  createSponsor,
  updateSponsor,
  deleteSponsor,
} from "../controllers/sponsorController";

const router = Router();

router.get("/", getSponsors);

router.post("/", createSponsor);

router.put("/:id", updateSponsor);

router.delete("/:id", deleteSponsor);

export default router;