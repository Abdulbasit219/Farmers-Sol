import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./connection/DB.js";
import routes from "./routes/AuthRoute.js";
import ProductsRoute from "./routes/ProductRoute.js"
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow cookies
  })
);
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;

app.use("/api/v1/auth", routes);
app.use("/api/v1/products", ProductsRoute)

app.listen(port, () => {
  console.log(`APP listening on port ${port}`);
});
