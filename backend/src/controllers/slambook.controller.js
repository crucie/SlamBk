import { Slambook } from "../models/slambook.model.js";
import slugify from "slugify";
import crypto from "crypto";

// Helper to generate a unique slug
const generateSlug = (title) => {
  const base = slugify(title, { lower: true, strict: true });
  const suffix = crypto.randomBytes(3).toString("hex");
  return `${base}-${suffix}`;
};

// POST / — Create a new Slambook
export const createSlambook = async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const slug = generateSlug(title);

    const slambook = await Slambook.create({
      owner: req.user._id,
      title,
      description: description || "",
      slug,
      questions: questions || [],
    });

    res.status(201).json({
      success: true,
      message: "Slambook created successfully",
      data: slambook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /my-slambooks — Fetch all slambooks for the logged-in user
export const getMySlambooks = async (req, res) => {
  try {
    const slambooks = await Slambook.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: slambooks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /:id — Get a specific slambook by ID (owner only)
export const getSlambookById = async (req, res) => {
  try {
    const slambook = await Slambook.findById(req.params.id);

    if (!slambook) {
      return res.status(404).json({
        success: false,
        message: "Slambook not found",
      });
    }

    // Ownership check
    if (slambook.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this slambook",
      });
    }

    res.status(200).json({
      success: true,
      data: slambook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /public/:slug — Public endpoint to fetch a slambook for filling
export const getPublicSlambook = async (req, res) => {
  try {
    const slambook = await Slambook.findOne({
      slug: req.params.slug,
      isActive: true,
    }).select("title description questions slug");

    if (!slambook) {
      return res.status(404).json({
        success: false,
        message: "Slambook not found or is no longer active",
      });
    }

    res.status(200).json({
      success: true,
      data: slambook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE /:id — Delete a slambook (owner only)
export const deleteSlambook = async (req, res) => {
  try {
    const slambook = await Slambook.findById(req.params.id);

    if (!slambook) {
      return res.status(404).json({
        success: false,
        message: "Slambook not found",
      });
    }

    if (slambook.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this slambook",
      });
    }

    await Slambook.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Slambook deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
