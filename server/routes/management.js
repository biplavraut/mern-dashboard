import express from 'express';
import { getAdmins, getUserPerformance, createAdmin, updateAdmin, deleteAdmin } from "../controllers/management.js"

const router = express.Router();

router.get("/admins", getAdmins);
router.post("/admin", createAdmin);
router.route("/admin/:id").put(updateAdmin).delete(deleteAdmin);

router.get("/performance/:id", getUserPerformance);

export default router;