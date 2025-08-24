import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./connection/DB.js";
import routes from "./routes/AuthRoute.js";
import ProductsRoute from "./routes/ProductRoute.js";
import cookieParser from "cookie-parser";
import CategoryRoute from "./routes/CategoryRoutes.js";
import OrderRoute from "./routes/OrderRoute.js";
import path from "path"

const app = express();

dotenv.config();
connectDB();

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://farmers-and-buyers-frontend.onrender.com", // frontend URL
    credentials: true, // allow cookies
  })
);

const port = process.env.PORT;

app.use("/auth", routes);
app.use("/products", ProductsRoute);
app.use("/category", CategoryRoute);
app.use("/order", OrderRoute);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`APP listening on port ${port}`);
});
