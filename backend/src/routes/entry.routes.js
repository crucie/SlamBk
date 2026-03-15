import express from "express";
import {
  submitEntry,
  getEntriesBySlambook,
} from "../controllers/entry.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public route — anyone can submit an entry
router.post("/submit/:slambookId", submitEntry);

// Protected route — only the owner can view entries
router.get("/slambook/:slambookId", verifyJWT, getEntriesBySlambook);

export default router;
