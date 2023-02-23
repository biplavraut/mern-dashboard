import express from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct, getCustomers, getTransactions, getGeography } from "../controllers/client.js"

const router = express.Router();

router.get("/products", getProducts);
router.post("/product", createProduct);
// router.put("/product/:id", updateProduct);
// router.delete("/product/:id", deleteProduct);
router.route("/product/:id").put(updateProduct).delete(deleteProduct);

router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);


export default router;