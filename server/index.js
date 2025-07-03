import express from "express";
import cors from "cors";
import dotenv from "dotenv"

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`APP listening on port ${port}`);
});