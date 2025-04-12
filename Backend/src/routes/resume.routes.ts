import { Router } from "express";
import { updateResumeSlug } from "../controllers/resume.controller";

const router = Router();

router.post("/update-slug", updateResumeSlug);

export default router;
