import asyncHandler from "express-async-handler";
import Categories from "../Models/CategoriesModal.js";

//Public controllers

const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Categories.find({});
    res.json(categories);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

const createCategories = asyncHandler(async (req, res) => {
  try {
    const { title } = req.body;
    const category = new Categories({
      title,
    });
    const createdCategory = await category.save();
    res.json(createdCategory);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Categories.findById(req.body.id);
    if (category) {
      category.title = req.body.title ?? category.title;
      const updateCategory = await category.save();
      res.json(updateCategory);
    } else {
      res.status(404).json({
        message: "Category not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

//delete Category
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);
    if (category) {
      await category.remove();
      res.status(201).json({
        message: "Category removed",
      });
    } else {
      res.status(404);
      throw new Error("Category not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export  {
  getCategories,
  createCategories,
  updateCategory,
  deleteCategory
};
