import asyncHandler from "express-async-handler";
import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/Auth.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, image } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    const salt = await bcrypt.genSaltSync(10);
    console.log(salt);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      image,
    });

    if (user) {
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid email or password");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { fullName, email, image, isAdmin } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.fullName = fullName || user.fullName;
      user.email = email || user.email;
      user.image = image || user.image;
      user.isAdmin = isAdmin ?? user.isAdmin;
      const updateUser = await user.save();
      res.json({
        _id: updateUser._id,
        fullName: updateUser.fullName,
        email: updateUser.email,
        image: updateUser.image,
        isAdmin: isAdmin ?? updateUser.isAdmin,
        token: generateToken(updateUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

const deleteUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Cant deelte admin user");
      }
      await user.remove();
      res.json({
        message: "User deleted successfully",
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});
// change user passwors

const changeUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = User.findById(req.user._id);
  try {
    if (user && (await bcrypt.compare(oldPassword, user.password))) {
      const salt = await bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      await user.save();
      res.status(200).json({
        message: "Passsword changed!",
      });
    } else {
      res.status(404);
      throw new Error("Invalid old password");
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

const getLikeMovies = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("likeMovies");
    if (user) {
      res.status(200).json(user.likeMovies);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

const addLikedMovie = asyncHandler(async (req, res) => {
  const { movieId } = req.body;
  console.log(movieId);
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      console.log(user);
      if (user?.likeMovies?.includes(movieId)) {
        res.status(404);
        throw new Error("Movie already liked");
      }
      user.likeMovies.push(movieId);
      await user.save();
      res.status(200).json(user.likeMovies);
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

const deleteLikedMovie = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.likeMovies = [];
      await user.save();
      res.status(200).json({
        message: "All liked movies deleted successsfuly",
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// ***Admin Controller ***
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.isAdmin) {
        res.status(404);
        throw new Error("Cant delete admin user");
      }
      await user.remove();
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

export {
  registerUser,
  loginUser,
  updateUserProfile,
  deleteUserProfile,
  changeUserPassword,
  getLikeMovies,
  addLikedMovie,
  deleteLikedMovie,
  getUsers,
  deleteUser,
};
