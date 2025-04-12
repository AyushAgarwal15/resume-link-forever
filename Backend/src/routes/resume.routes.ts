import { Router } from "express";
import { updateResumeSlug, getResume } from "../controllers/resume.controller";

const router = Router();

router.post("/update-slug", updateResumeSlug);
router.get("/:resumeSlug", getResume);

export default router;
