import express from "express";
const router = express.Router();
export default router;
import { getCategories } from "../controllers/categoryController.js";

// @desc Fetch all categories
// @route GET /api/categories
// @access Public
router.route("/").get(getCategories);
