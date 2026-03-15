import express from "express";
import {
  createSlambook,
  getMySlambooks,
  getSlambookById,
  getPublicSlambook,
  deleteSlambook,
} from "../controllers/slambook.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public route
router.get("/public/:slug", getPublicSlambook);

// Protected routes
router.post("/", verifyJWT, createSlambook);
router.get("/my-slambooks", verifyJWT, getMySlambooks);
router.get("/:id", verifyJWT, getSlambookById);
router.delete("/:id", verifyJWT, deleteSlambook);

export default router;