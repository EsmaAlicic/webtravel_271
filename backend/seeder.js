import mongoose from "mongoose";
import dotenv from "dotenv";

import users from "./data/users.js";
import trips from "./data/trips.js";

import User from "./models/userModel.js";
import Trip from "./models/tripModel.js";
import Order from "./models/orderModel.js";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Trip.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(users);
    const adminUser = createdUser[0]._id;

    const sampleTrips = trips.map((trip) => {
      return { ...trip, user: adminUser };
    });

    await Trip.insertMany(sampleTrips);
    console.log("DATA IMPORTED");
    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Trip.deleteMany();
    await User.deleteMany();

    console.log("DATA DESTROYED");
    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
