import express from "express";

import { protaction, admin } from "../middlewares/Auth.js";
import {
    getCategories,
  createCategories,
  updateCategory,
  deleteCategory
} from "../Controlles/CategoriesController.js";


const router = express.Router();

// PUBLIC ROUTES
router.post("/", getCategories);



// ADMIN ROUTES
router.post("/", protaction, admin, createCategories);
router.put("/:id", protaction, admin, updateCategory);
router.delete("/:id", protaction, admin, deleteCategory);

export default router;
