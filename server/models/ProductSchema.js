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
    imageUrl: {
      type: [String],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'farmerCategory',
      required: true,
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
