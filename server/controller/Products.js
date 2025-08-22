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
      status: req.user.isAdmin === 1 ? "approved" : "pending",
    });

    await newProducts.save();
    res.status(201).send({
      success: true,
      message: "Products created successfully",
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

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
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
    const page = parseInt(req.query.page) || 1;
    const perPage = 6;

    const isAdminView = req.query.admin === "true";

    let filter = {};
    if (!isAdminView) {
      filter = {
        status: "approved",
      };
    }

    const totalProducts = await productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / perPage);

    if (page > totalPages) {
      return res.status(404).send({
        success: false,
        message: "Page Not found",
      });
    }

    const products = await productModel
      .find(filter)
      .skip((page - 1) * perPage)
      .limit(perPage);

    // for admin dashboard card
    let adminProducts = [];
    let pendingCount = 0;

    if (isAdminView) {
      adminProducts = await productModel.find();
      pendingCount = adminProducts.filter((p) => p.status === "pending").length;
    }

    res.status(200).json({
      success: true,
      totalProducts,
      products,
      page,
      totalPages,
      pendingCount,
      adminProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while getting product",
    });
  }
};

const searchProduct = async (req, res) => {
  try {
    const { query } = req.body;
    const page = parseInt(req.query.page) || 1;
    const perPage = 6;

    const filter = {
      $and: [
        { status: "approved" },
        {
          $or: [
            { title: { $regex: `^\\b${query}\\b`, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
          ],
        },
      ],
    };

    const totalProducts = await productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / perPage);

    if (page > totalPages && totalProducts > 0) {
      return res.status(404).send({
        success: false,
        message: "Page Not Found",
      });
    }

    const searchResult = await productModel
      .find(filter)
      .skip((page - 1) * perPage)
      .limit(perPage);

    if (searchProduct.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Data Not Found",
      });
    }

    return res.status(200).send({
      success: true,
      searchResult,
      totalPages,
      totalProducts,
      perPage,
      searchResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while searching product",
    });
  }
};

// for admin status filter
const filterProducts = async (req, res) => {
  try {
    const status = req.query.status || "All";
    const page = parseInt(req.query.page) || 1;
    const perPage = 6;

    if (!status) {
      return res.status(404).send({
        success: false,
        message: "status parameter not found",
      });
    }

    let filter = {};
    if (status !== "All") {
      filter.status = status;
    }

    const totalProducts = await productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / perPage);

    if (page > totalPages && totalProducts > 0) {
      return res.status(404).send({
        success: false,
        message: "Page Not Found",
      });
    }

    const filterResult = await productModel
      .find(filter)
      .skip((page - 1) * perPage)
      .limit(perPage);

    if (!filterResult || filterResult.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No products found",
      });
    }

    res.status(200).send({
      success: true,
      currentPage: page,
      totalPages,
      totalProducts,
      perPage,
      filterResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while Filtering product",
    });
  }
};

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

    const { title, description, price, quantity, category, unit } =
      req.body || {};

    const imageIndex = req.query.imageIndex;

    if (imageIndex !== undefined && imageIndex !== null) {
      const index = parseInt(imageIndex);
      if (
        !isNaN(index) &&
        index >= 0 &&
        index < existingProduct.imageUrl.length
      ) {
        existingProduct.imageUrl.splice(index, 1);
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid image index",
        });
      }
    }

    if (req.files && req.files.length > 0) {
      const newImageUrls = req.files.map((file) => file.path);
      existingProduct.imageUrl.push(...newImageUrls);
    }

    const updatedFields = {
      title: title || existingProduct.title,
      description: description || existingProduct.description,
      price: price || existingProduct.price,
      quantity: quantity || existingProduct.quantity,
      unit: unit || existingProduct.unit,
      category: category || existingProduct.category,
      imageUrl: existingProduct.imageUrl,
      status: "pending",
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
    const { query } = req.query;
    const page = parseInt(req.query.page) || 1;
    const perPage = 6;

    let filter = { createdBy: id };

    if (query && query.trim() !== "") {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ];
    }

    const totalProducts = await productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / perPage);

    const products = await productModel
      .find(filter)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found for this farmer",
      });
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
      pagination: {
        totalProducts,
        totalPages,
        currentPage: page,
        perPage,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while getting products by farmer ID",
    });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const perPage = 6;

    const filter = { category: id, status: "approved" };

    const totalProducts = await productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / perPage);

    if (page > totalPages && totalProducts > 0) {
      return res.status(404).send({
        success: false,
        message: "Page Not found",
      });
    }

    const products = await productModel
      .find(filter)
      .skip((page - 1) * perPage)
      .limit(perPage);

    if (!products || products.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No approved products found in this category",
        products: [],
        totalProducts: 0,
        page,
        totalPages: 0,
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully fetched approved products",
      products,
      totalProducts,
      page,
      totalPages,
    });
  } catch (error) {
    console.error("Error in getProductsByCategory:", error);
    res.status(500).json({
      success: false,
      message: "Server error while getting products by category",
    });
  }
};

const approvedProducts = async (req, res) => {
  try {
    const productId = req.params.id;
    const { status } = req.body;
    if (!["approved", "rejected", "pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }
    const updatedProduct = await productModel.findByIdAndUpdate(productId, {
      status,
    });
    res.status(200).json({
      success: true,
      message: "Product has been Approved.",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error while Approved products by Admin",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const products = await productModel.find({ _id: id });

    if (!products) {
      return res.status(404).json({
        success: false,
        message: "No products founds from this id",
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

export {
  createProducts,
  deleteProducts,
  updateProduct,
  getProducts,
  getProductsbyFarmerId,
  getProductsByCategory,
  approvedProducts,
  getProductById,
  searchProduct,
  filterProducts,
};
