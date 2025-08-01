import categoryModel from "../models/CategorySchema.js";
import productSchema from "../models/ProductSchema.js";

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name)
      return res.status(400).json({ message: "Category name is required" });

    const existingsCategory = await categoryModel.findOne({ name });
    if (existingsCategory)
      return res.status(400).json({ message: "Category already exists" });

    const newCategory = new categoryModel({ name });
    await newCategory.save();

    res.status(201).json({ success: true, category: newCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "No categories found",
      });
    }
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "New category name is required" });
    }

    const updateCategory = await categoryModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updateCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category: updateCategory,
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to update category",
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await categoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await productSchema.deleteMany({ category: categoryId });

    await categoryModel.findByIdAndDelete(categoryId);

    res.status(200).json({
      success: true,
      message: "Category and its products deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to Delete category",
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.find({ _id: id });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "No category founds from this Id",
      });
    }

    res.status(200).json({
      success: true,
      message: "successfully Category fetch",
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to get category By Id",
    });
  }
};

export { createCategory, getAllCategories, updateCategory, deleteCategory, getCategoryById };
