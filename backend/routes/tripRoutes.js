import express from "express";
const router = express.Router();
export default router;
import {
  deleteTrip,
  getTripbyId,
  getTrips,
  updateTrip,
  createTrip,
  createTripQuestion,
  deleteQuestion,
} from "../controllers/tripController.js";
import { isAdmin, protectProfile } from "../middleware/auth.js";

// @desc Fetch all trips
// @route GET /api/trips
// @access Public
router.route("/").get(getTrips).post(protectProfile, isAdmin, createTrip);
// @desc Fetch single trip
// @route GET /api/trip/:id
// @access Public

router
  .route("/:id")
  .get(getTripbyId)
  .delete(protectProfile, isAdmin, deleteTrip)
  .put(protectProfile, isAdmin, updateTrip);

router.route("/:id/questions").post(protectProfile, createTripQuestion);
router
  .route("/:id/questions/:questionId")
  .delete(protectProfile, deleteQuestion);
