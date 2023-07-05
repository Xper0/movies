import express from "express";

import { protaction, admin } from "../middlewares/Auth.js";
import {
  importMovies,
  getMovies,
  getMovieById,
  getTopRateMovies,
  getRandomMovies,
  createMoviesReview,
  updateMovies,
  deleteMovies,
  deleteAllMovies,
  createMovie
} from "../Controlles/MoviesController.js";
const router = express.Router();

// PUBLIC ROUTES
router.post("/import", importMovies);
router.get("/", getMovies);
router.get("/:id", getMovieById);
router.get("/rated/top", getTopRateMovies);
router.get("/random/all", getRandomMovies);
// PRIVATE ROUTES
router.post("/:id/reviews", protaction, createMoviesReview);

// ADMIN ROUTES
router.put("/:id", protaction, admin, updateMovies);
router.delete("/:id", protaction, admin, deleteMovies);
router.delete("/", protaction, admin, deleteAllMovies);
router.post("/", protaction, admin, createMovie);

export default router;
