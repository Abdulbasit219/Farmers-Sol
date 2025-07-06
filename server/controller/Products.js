import Products from "../models/ProductSchema.js";

const createProducts = async (req, res) => {
  try {
    if (req.user.role !== "farmer") {
      return res.status(403).json({
        success: false,
        message: "Only farmers are allowed to create products.",
      });
    }

    const { title, description, price, quantity, category } = req.body;

    if (!title || !price || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const imagePaths = req.files ? req.files.map((file) => file.path) : [];

    const products = new Products({
      title,
      description,
      price,
      quantity,
      category,
      imageUrl: imagePaths,
      createdBy: req.user._id,
    });

    await products.save();
    res.status(201).send({
      success: true,
      message: "Products was created successfully",
    });
  } catch (error) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error while Creating a products",
    });
  }
};

export { createProducts };
