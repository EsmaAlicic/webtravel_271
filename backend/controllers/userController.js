import User from "../models/userModel.js";
import asnycHandler from "express-async-handler";
import generateToken from "../utils/tokengenerator.js";
// @desc Auth User
// @route POST /api/users/login
// @access Public
const getUserAuth = asnycHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    if(!user.isActive) {
      res.status(401);
      throw new Error("Your account is not active");
    } else {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isActive: user.isActive,
        token: generateToken(user._id),
      });
    }
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Registering a User
// @route POST /api/users
// @access Public
const registerUser = asnycHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isActive: user.isActive,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User has not been created - error while trying to!");
  }
});

// @desc Get User Profile
// @route GET /api/users/profile
// @access Private

const getUserProfile = asnycHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isActive: user.isActive
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Update User Profile
// @route PUT /api/users/profile
// @access Private

const updateUserProfile = asnycHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isActive: updatedUser.isActive,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Get UseRS
// @route GET /api/users
// @access Private/Admin

const getUsers = asnycHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asnycHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User deleted!" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc GET user by id
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asnycHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Update User Profile by ID
// @route PUT /api/users/:id
// @access Private/Admin

const updateUser = asnycHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isActive = req.body.isActive;
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isActive: updatedUser.isActive
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
export {
  getUserAuth,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
