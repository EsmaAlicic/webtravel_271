import Trip from "../models/tripModel.js";
import asnycHandler from "express-async-handler";
import mongoose from "mongoose";
// @desc Fetch all trips
// @route GET /api/trips
// @access Public
const getTrips = asnycHandler(async (req, res) => {
  const pageSize = 4;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? { category: { $eq: req.query.keyword } }
    : {};

  const count = await Trip.countDocuments({ ...keyword });
  const trips = await Trip.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ trips, page, pages: Math.ceil(count / pageSize) });
});
// @desc Fetch single trip
// @route GET /api/trip/:id
// @access Public
const getTripbyId = asnycHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  if (trip) {
    res.json(trip);
  } else {
    res.status(404);
    throw new Error("Trip not found");
  }
});

// @desc Delete a trip
// @route DELETE /api/trip/:id
// @access Private/Admin
const deleteTrip = asnycHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  if (trip) {
    await trip.remove();
    res.json({ message: "Trip removed" });
  } else {
    res.status(404);
    throw new Error("Trip not found");
  }
});

// @desc Create a trip
// @route POST /api/trip/:id
// @access Private/Admin
const createTrip = asnycHandler(async (req, res) => {
  const trip = new Trip({
    name: "New Trip",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    destination: "New Trip's Destination",
    category: "Sample category",
    countInStock: 0,
    description: "Sample desscription",
  });
  const createdTrip = await trip.save();
  res.status(201).json(createdTrip);
});

// @desc Update a trip
// @route PUT /api/trip/:id
// @access Private/Admin
const updateTrip = asnycHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    destination,
    category,
    countInStock,
  } = req.body;
  const trip = await Trip.findById(req.params.id);

  if (trip) {
    trip.name = name;
    trip.price = price;
    trip.description = description;
    trip.image = image;
    trip.destination = destination;
    trip.category = category;
    trip.countInStock = countInStock;
    const updatedTrip = await trip.save();
    res.status(201).json(updatedTrip);
  } else {
    res.status(404);
    throw new Error("Trip not found");
  }
});

// @desc Create new question
// @route POST /api/trip/:id/questions
// @access Private
const createTripQuestion = asnycHandler(async (req, res) => {
  const { comment } = req.body;
  const trip = await Trip.findById(req.params.id);

  if (trip) {
    const question = {
      name: req.user.name,
      comment,
      user: req.user._id,
    };
    trip.questions.push(question);

    await trip.save();
    res.status(201).json({ message: "Question added" });
  } else {
    res.status(404);
    throw new Error("Trip not found");
  }
});

// @desc Delete a question
// @route DELETE /api/trip/:id/questions/:questionId
// @access Private
const deleteQuestion = asnycHandler(async (req, res) => {
  const trip = await Trip.findByIdAndUpdate(
    req.params.id,
    {
      $pull: {
        questions: { _id: mongoose.Types.ObjectId(req.params.questionId) },
      },
    },
    { new: true }
  );

  if (trip) {
    res.status(201).json(trip);
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
});

export {
  getTrips,
  getTripbyId,
  deleteTrip,
  updateTrip,
  createTrip,
  createTripQuestion,
  deleteQuestion,
};
