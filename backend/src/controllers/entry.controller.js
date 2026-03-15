import { Entry } from "../models/entry.model.js";
import { Slambook } from "../models/slambook.model.js";

// POST /submit/:slambookId — Submit answers to a slambook (Public)
export const submitEntry = async (req, res) => {
  try {
    const { slambookId } = req.params;
    const { fillerName, answers } = req.body;

    if (!fillerName) {
      return res.status(400).json({
        success: false,
        message: "Your name is required",
      });
    }

    // Verify slambook exists and is active
    const slambook = await Slambook.findById(slambookId);

    if (!slambook || !slambook.isActive) {
      return res.status(404).json({
        success: false,
        message: "Slambook not found or is no longer active",
      });
    }

    const entry = await Entry.create({
      slambook: slambookId,
      fillerName,
      answers: answers || {},
    });

    res.status(201).json({
      success: true,
      message: "Entry submitted successfully! 🎉",
      data: entry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /slambook/:slambookId — Fetch all entries for a slambook (Owner only)
export const getEntriesBySlambook = async (req, res) => {
  try {
    const { slambookId } = req.params;

    // Verify the slambook belongs to the logged-in user
    const slambook = await Slambook.findById(slambookId);

    if (!slambook) {
      return res.status(404).json({
        success: false,
        message: "Slambook not found",
      });
    }

    if (slambook.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view these entries",
      });
    }

    const entries = await Entry.find({ slambook: slambookId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: entries,
      count: entries.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
