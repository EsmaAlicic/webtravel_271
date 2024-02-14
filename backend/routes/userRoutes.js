import express from "express";
const router = express.Router();
import {
  getUserAuth,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { protectProfile, isAdmin } from "../middleware/auth.js";

router.route("/").post(registerUser).get(protectProfile, isAdmin, getUsers);

router.route("/login").post(getUserAuth);
router.route("/profile").get(protectProfile, getUserProfile);
router.route("/profile").put(protectProfile, updateUserProfile);
router
  .route("/:id")
  .delete(protectProfile, isAdmin, deleteUser)
  .get(protectProfile, isAdmin, getUserById)
  .put(protectProfile, isAdmin, updateUser);

export default router;
