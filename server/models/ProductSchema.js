import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
    },
    unit: {
      type: String,
      enum: ['kg', 'liters', 'dozen'],
    },
    imageUrl: {
      type: [String],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'farmerCategory',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: "pending"
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FarmSol", 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const products = mongoose.model("farmerProducts", productSchema);

export default products;
