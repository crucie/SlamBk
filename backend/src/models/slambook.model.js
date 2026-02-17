import mongoose from "mongoose";

const slambookSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        default: "My Slambook"
    },
    description: {
        type: String
    },
    // This allows custom questions for EACH form
    questions: [
        {
            questionText: { type: String, required: true },
            fieldType: { type: String, enum: ["text", "number", "color", "date"], default: "text" },
            isRequired: { type: Boolean, default: false }
        }
    ],
    // Helps you generate short URLs later (e.g., /s/summer-vibe)
    slug: {
        type: String,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export const Slambook = mongoose.model("Slambook", slambookSchema);