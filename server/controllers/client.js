import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transaction.js"
import User from "../models/User.js";

import getCountryIso3 from "country-iso-2-to-3";


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        const productsWithStats = await Promise.all(
            products.map(async (product) => {
                const stat = await ProductStat.find({
                    productId: product._id
                })
                return {
                    ...product._doc,
                    stat,
                }
            })
        );

        res.status(200).json(productsWithStats);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: "user" }).select("-password");
        res.status(200).json(customers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getTransactions = async (req, res) => {
    try {
        // sort should look like this: { "field": "userId":,  "sort": "desc"}
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

        // formatted sort should look like { userId: -1 }
        const generalSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field]: sortParsed.sort = "asc" ? 1 : -1
            };

            return sortFormatted;
        }

        const sortFormatted = Boolean(sort) ? generalSort() : {};

        const transactions = await Transaction.find({
            $or: [
                { cost: { $regex: new RegExp(search, "i") } },
                { userId: { $regex: new RegExp(search, "i") } }
            ],
        })
            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize);
        const total = await Transaction.countDocuments({
            name: { $regex: search, $options: "i" }
        });



        res.status(200).json({
            transactions,
            total
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getGeography = async (req, res) => {
    try {
        const users = await User.find();

        const mappedLocations = users.reduce((acc, { country }) => {
            const countryISO3 = getCountryIso3(country);
            if (!acc[countryISO3]) {
                acc[countryISO3] = 0;
            }
            acc[countryISO3]++;
            return acc;
        }, {});

        const formattedLocations = Object.entries(mappedLocations).map(
            ([country, count]) => {
                return { id: country, value: count };
            }
        )
        res.status(200).json(formattedLocations);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


// Create Product
export const createProduct = async (req, res) => {
    try {
        if (!req.body.name) {
            res.status(400).json({ message: error.message }); // sime issue when text message is sent
        }
        //console.log(req.body);
        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            rating: req.body.rating,
            supply: req.body.supply
        });
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Update Product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            res.status(400).json({ message: "Product Not Found" });
            return;
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({ message: `Product Updated ${req.params.id}`, product: updatedProduct });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Delete Product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            res.status(400).json({ message: "Product Not Found" });
            return;
        }
        const deletedProduct = await Product.findByIdAndDelete(id)
        res.status(200).json({ message: `Product Deleted ${req.params.id}` });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}