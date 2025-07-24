import productModel from "../models/ProductSchema.js";

const createProducts = async (req, res) => {
  try {
    if (req.user.role !== "farmer") {
      return res.status(403).json({
        success: false,
        message: "Only farmers are allowed to create products.",
      });
    }

    const { title, description, price, quantity, unit, category } = req.body;

    if (!title || !price || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const imagePaths = req.files ? req.files.map((file) => file.path) : [];

    const newProducts = new productModel({
      title,
      description,
      price,
      quantity,
      unit,
      category,
      imageUrl: imagePaths,
      createdBy: req.user._id,
    });

    await newProducts.save();
    res.status(201).send({
      success: true,
      message: "Products was created successfully",
      product: newProducts,
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({
      success: false,
      message: "Error while creating product",
      error: error.message,
    });
  }
};

const deleteProducts = async (req, res) => {
  try {
    const productId = req.params.id;

    // const products = await productModel.findByIdAndDelete(productId);
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this product",
      });
    }

    await productModel.findByIdAndDelete(productId);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting product",
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();

    res.status(200).json({
      success: true,
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error while getting product",
    });
  }
};

//pending images updation
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user._id;

    const existingProduct = await productModel.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (existingProduct.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this product",
      });
    }

    const { title, description, price, quantity, category } = req.body;

    const updatedFields = {
      title: title || existingProduct.title,
      description: description || existingProduct.description,
      price: price || existingProduct.price,
      quantity: quantity || existingProduct.quantity,
      category: category || existingProduct.category,
      // imageUrl
    };

    const updatedProducts = await productModel.findByIdAndUpdate(
      productId,
      updatedFields,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error while updating product",
    });
  }
};

const getProductsbyFarmerId = async (req, res) => {
  try {
    const { id } = req.params;

    const products = await productModel.find({ createdBy: id });

    if (!products) {
      return res.status(404).json({
        success: false,
        message: "No products found for this farmer",
      });
    }

    res.status(200).json({
      success: true,
      message: "products fetch successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error while get products by id",
    });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const products = await productModel.find({ category: id });

    if (!products) {
      return res.status(404).json({
        success: false,
        message: "No products founds from this category",
      });
    }

    res.status(200).json({
      success: true,
      message: "successfully Products fetch",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error while get products by id",
    });
  }
};

const approvedProducts = async (req, res) => {
  try {
    const productId = req.params.id;
    const { status } = req.body;
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }
    const updatedProduct = await productModel.findByIdAndUpdate(productId, {
      status,
    });
    res
      .status(200)
      .json({ message: "Product status updated.", product: updatedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error while Approved products by Admin",
    });
  }
};

export {
  createProducts,
  deleteProducts,
  updateProduct,
  getProducts,
  getProductsbyFarmerId,
  getProductsByCategory,
  approvedProducts,
};
