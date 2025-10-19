import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => res.send("API working"));

// rest api
app.use("/api/auth", authRoutes);

// connect to MongoDB and start server
connectDB()
  .then(() => {
    app.listen(port, () => console.log(`server is running on port ${port}`));
  })
  .catch((err) => {
    // connectDB already logs the error
    process.exit(1);
  });
