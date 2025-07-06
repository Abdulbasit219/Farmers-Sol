import Products from "../models/ProductSchema.js";

const createProducts = async (req, res) => {
  try {
    const { title, description, price, quantity } = req.body;

    if (!title || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const imagePaths = req.files ? req.files.map((file) => file.path) : [];

    const products = new Products({
      title,
      description,
      price,
      quantity,
      imageUrl: imagePaths,
      createdBy: req.userId,
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
