import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";

import User from "../models/User.js";


// Login User
// @desc Authenticate a user
// @route POST auth/login
// @access Public 
export const loginAdmin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    // Check user email exist
    const admin = await User.findOne({ email })
    if (admin && (await bcrypt.compare(password, admin.password))) {
        res.status(201).json({
            _id: admin.id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id)
        });
    } else {
        res.status(400)
        throw new Error("Invalid Credentials.");
    }
});

// Logged In user Data
// @desc    Get user data
// @route   GET auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
    // const { _id, name, email } = await User.findById(req.user.id);
    res.status(200).json(req.user);
})

export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}