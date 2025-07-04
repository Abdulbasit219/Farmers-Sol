import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./connection/DB.js";
import routes from "./routes/AuthRoute.js";

const app = express();

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

const port = process.env.PORT;

app.use("/api/v1/auth", routes);

app.listen(port, () => {
  console.log(`APP listening on port ${port}`);
});
