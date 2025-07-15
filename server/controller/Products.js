import productModel from "../models/ProductSchema.js";

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

    const products = new productModel({
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

//pending
const updateProduct = async (req, res) => {
  try {
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
    const {id} = req.params;

    const products = await productModel.find({createdBy: id});

     if (!products) {
      return res.status(404).json({
        success: false,
        message: "No products found for this farmer",
      });
    }

    res.status(200).json({
      success: true,
      message: "products fetch successfully",
      products
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error while get products by id",
    });
  }
};

const getProductsByCategory = async (req,res) => {
  try {
    const {id} = req.params;

    const products = await productModel.find({category: id});

    if(!products){
      return res.status(404).json({
        success: false,
        message: "No products founds from this category"
      })
    }

    res.status(200).json({
      success: true,
      message: "successfully Products fetch",
      products  
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error while get products by id",
    });
  }
}

export {
  createProducts,
  deleteProducts,
  updateProduct,
  getProducts,
  getProductsbyFarmerId,
  getProductsByCategory
};
