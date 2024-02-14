import Trip from "../models/tripModel.js";
import asnycHandler from "express-async-handler";

// @desc Fetch all categories
// @route GET /api/categories
// @access Public
const getCategories = asnycHandler(async (req, res) => {
  const categories = await Trip.distinct("category");
  res.json({ categories });
});

export { getCategories };
