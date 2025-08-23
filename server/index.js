import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./connection/DB.js";
import routes from "./routes/AuthRoute.js";
import ProductsRoute from "./routes/ProductRoute.js";
import cookieParser from "cookie-parser";
import CategoryRoute from "./routes/CategoryRoutes.js";
import OrderRoute from "./routes/OrderRoute.js";

const app = express();

dotenv.config();
connectDB();

app.use(
  cors({
    origin: "https://farmers-sol.vercel.app", // frontend URL
    credentials: true, // allow cookies
  })
);

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;

app.use("/auth", routes);
app.use("/products", ProductsRoute);
app.use("/category", CategoryRoute);
app.use("/order", OrderRoute);

app.listen(port, () => {
  console.log(`APP listening on port ${port}`);
});
