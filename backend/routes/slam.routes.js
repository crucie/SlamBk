import express from "express";
import { 
    getUsers,
    getUser,
    createUser,
} from "../controllers/user.controller.js";


const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);

export default router;