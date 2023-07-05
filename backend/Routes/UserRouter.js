import express from "express";
import {
  loginUser,
  registerUser,
  updateUserProfile,
  deleteUserProfile,
  changeUserPassword,
  getLikeMovies,
  addLikedMovie,
  deleteLikedMovie,
  getUsers,
  deleteUser,
} from "../Controlles/UserController.js";
import { protaction, admin } from "../middlewares/Auth.js";
const router = express.Router();

// PUBLIC ROUTES
router.post("/", registerUser);
router.post("/login", loginUser);

// PRIVATE ROUTES
router.put("/", protaction, updateUserProfile);
router.delete("/", protaction, deleteUserProfile);
router.put("password", protaction, changeUserPassword);
router.get("/favorites", protaction, getLikeMovies);
router.post("/favorites", protaction, addLikedMovie);
router.delete("/favorites", protaction, deleteLikedMovie);

// ADMIN ROUTES
router.get("/", protaction, admin, getUsers);
router.delete("/:id", protaction, admin, deleteUser);

export default router;
