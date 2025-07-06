import categoryModel from "../models/CategorySchema.js";

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
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
};

export { createCategory, getAllCategories };
