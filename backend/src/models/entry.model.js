import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
    slambook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Slambook",
        required: true
    },
    filledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" 
    }, // Optional: Can be null if filled anonymously
    
    fillerName: { type: String, required: true }, // "Amay" or "Anonymous"
    
    // Store answers as a Map or flexible Object to match the dynamic questions
    answers: {
        type: Map,
        of: String 
    }
    // Example data: { "favoriteMovie": "Inception", "crushName": "Secret" }
}, { timestamps: true });

export const Entry = mongoose.model("Entry", entrySchema);