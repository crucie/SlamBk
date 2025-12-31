import express from "express";
import User from "../models/user.models.js" ;

const getUsers = async (req, res) => {
    try {
        const Users = await User.find({});
        res.status(200).json(Users);
    } catch (error) {
        res.status(500).json({message: error.message });
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({message: "User not Found"})
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { 
            fullName, 
            nickName, 
            dob, 
            address, 
            contactNum, 
            email, 
            favoriteColor, 
            favoriteMovie, 
            favoriteSong, 
            bestMemoryWithMe, 
            oneWordForMe, 
            adviceForMe, 
            crushName 
        } = req.body;
        
        if (!fullName || !dob || !address || !contactNum) {
            return res.status(400).json({ message: "fullName, dob, address, and contactNum are required" });
        }

        const newUser = new User({
            fullName,
            nickName: nickName || "",
            dob: new Date(dob),
            address,
            contactNum,
            email: email || "",
            favoriteColor: favoriteColor || "",
            favoriteMovie: favoriteMovie || "",
            favoriteSong: favoriteSong || "",
            bestMemoryWithMe: bestMemoryWithMe || "",
            oneWordForMe: oneWordForMe || "",
            adviceForMe: adviceForMe || "",
            crushName: crushName || ""
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {getUsers, getUser, createUser}