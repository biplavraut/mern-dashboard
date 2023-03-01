import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { generateToken } from "./auth.js";

export const getAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: "admin" }).select("-password");
        res.status(200).json(admins);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserPerformance = async (req, res) => {
    try {
        const { id } = req.params;

        const userWithStats = await User.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) }
            },
            {
                $lookup: {
                    from: "affiliatestats",
                    localField: "_id",
                    foreignField: "userId",
                    as: "affiliateStats"
                },
            },
            {
                $unwind: "$affiliateStats"
            }
        ]);

        const saleTransactions = await Promise.all(
            userWithStats[0].affiliateStats.affiliateSales.map((id) => {
                return Transaction.findById(id)
            })
        );

        const filteredSaleTransactions = saleTransactions.filter((transaction) =>
            transaction !== null
        );
        res.status(200).json({ user: userWithStats[0], sales: filteredSaleTransactions });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Create Admin
// @desc Register new Admin
// @route POST management/admin
// @access Admin 
export const createAdmin = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please input all required fields");
    }
    // Check if Email exist
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error("User email already exist");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const admin = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        occupation: req.body.occupation,
        phoneNumber: req.body.phoneNumber,
        role: req.body.role
    });
    if (admin) {
        res.status(201).json({
            _id: admin.id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id)
        })
    } else {
        res.status(400)
        throw new Error("Something went wrong.");
    }

});

// Update Admin
export const updateAdmin = async (req, res) => {
    try {
        res.status(200).json({ message: `Admin User info Updated ${req.params.id}`, product: updatedProduct });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Delete Admin
export const deleteAdmin = async (req, res) => {
    try {
        res.status(200).json({ message: `Admin User Deleted ${req.params.id}` });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}