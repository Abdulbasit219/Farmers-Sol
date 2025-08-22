import mongoose from "mongoose";
import orderModel from "../models/OrderSchema.js";
import productModel from "../models/ProductSchema.js";

const createOder = async (req, res) => {
  try {
    const { buyer, product, quantity, totalPrice, phoneNumber } = req.body;

    // validation
    if (!buyer || !product || !quantity || !totalPrice || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingProduct = await productModel.findById(product);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (quantity > existingProduct.quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${existingProduct.quantity} ${
          existingProduct.unit || ""
        } available`,
      });
    }

    const order = await orderModel.create({
      buyer,
      product,
      quantity,
      totalPrice,
      phoneNumber,
    });

    existingProduct.quantity -= quantity;
    await existingProduct.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

const getBuyerOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const { query } = req.query;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Id parameter is required",
      });
    }

    const searchCondition = [];
    if (query) {
      searchCondition.push(
        { "product.title": { $regex: query, $options: "i" } },
        { status: { $regex: query, $options: "i" } }
      );
    }

    const orders = await orderModel.aggregate([
      {
        $match: { buyer: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "farmerproducts",
          localField: "product",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      ...(searchCondition.length > 0
        ? [{ $match: { $or: searchCondition } }]
        : []),
      { $sort: { createdAt: -1 } },
    ]);

    if (!orders || orders.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Orders not found",
      });
    }

    res.status(200).send({
      success: true,
      orders,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getReceivedOrderByFarmer = async (req, res) => {
  try {
    const { id } = req.params;
    const { query } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Farmer ID is required",
      });
    }

    const matchStage = {
      "product.createdBy": new mongoose.Types.ObjectId(id),
    };

    if (query && query.trim() !== "") {
      matchStage.$or = [
        { "buyer.name": { $regex: query, $options: "i" } },
        { "buyer.email": { $regex: query, $options: "i" } },
      ];
    }

    const orders = await orderModel.aggregate([
      {
        $lookup: {
          from: "farmerproducts",
          localField: "product",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $lookup: {
          from: "farmsols",
          localField: "buyer",
          foreignField: "_id",
          as: "buyer",
        },
      },
      { $unwind: "$buyer" },
      {
        $match: matchStage,
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Internal Server error",
      error,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "order status has been Updated",
      order,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

// for admin
const getAllOrders = async (req, res) => {
  try {
    const { search } = req.query;
    const page = parseInt(req.query.page) || 1;
    const perPage = 3;

    const filter = {};
    if (search && search.trim() !== "") {
      filter.$or = [
        { "buyerDetails.name": { $regex: search, $options: "i" } },
        { "buyerDetails.email": { $regex: search, $options: "i" } },
        { "ProductsDetails.title": { $regex: search, $options: "i" } },
        { "productOwner.name": { $regex: search, $options: "i" } },
        { "productOwner.email": { $regex: search, $options: "i" } },
      ];
    }

    const pipeLine = [
      {
        $lookup: {
          from: "farmsols",
          localField: "buyer",
          foreignField: "_id",
          as: "buyerDetails",
        },
      },
      { $unwind: "$buyerDetails" },
      {
        $lookup: {
          from: "farmerproducts",
          localField: "product",
          foreignField: "_id",
          as: "ProductsDetails",
        },
      },
      { $unwind: "$ProductsDetails" },
      {
        $lookup: {
          from: "farmsols",
          localField: "ProductsDetails.createdBy",
          foreignField: "_id",
          as: "productOwner",
        },
      },
      { $unwind: "$productOwner" },
      {
        $project: {
          _id: 1,
          quantity: 1,
          totalPrice: 1,
          phoneNumber: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
          // buyer details
          "buyerDetails._id": 1,
          "buyerDetails.name": 1,
          "buyerDetails.email": 1,
          "buyerDetails.profilePic": 1,

          // products details
          "ProductsDetails._id": 1,
          "ProductsDetails.title": 1,
          "ProductsDetails.price": 1,
          "ProductsDetails.imageUrl": 1,

          // product owner
          "productOwner._id": 1,
          "productOwner.name": 1,
          "productOwner.email": 1,
          "productOwner.profilePic": 1,
        },
      },
    ];

    if (search) {
      pipeLine.push({ $match: filter });
    }

    const ordersAggregate = await orderModel.aggregate([
      ...pipeLine,
      { $count: "count" },
    ]);

    const totalOrders =
      ordersAggregate.length > 0 ? ordersAggregate[0].count : 0;
    const totalPages = Math.ceil(totalOrders / perPage);

    if (page > totalPages) {
      return res.status(404).send({
        success: false,
        message: "Page not Found",
      });
    }

    pipeLine.push({ $skip: (page - 1) * perPage });
    pipeLine.push({ $limit: perPage });

    const orders = await orderModel.aggregate(pipeLine);

    return res.status(200).send({
      success: true,
      message: "Order Fetch Successfully",
      orders,
      page,
      totalPages,
      totalOrders,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//for
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderModel.findById(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    if (order.status === "delivered" || order.status === "shipped") {
      return res.status(400).json({
        success: false,
        message: "Delivered orders cannot be deleted",
      });
    }

    await orderModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Order deleted" });
  } catch (error) {
    return res.statu(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export {
  createOder,
  getBuyerOrders,
  getReceivedOrderByFarmer,
  updateOrderStatus,
  getAllOrders,
  deleteOrder,
};
