import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import userRoutes from "./routes/users.js";
import productRoutes from "./routes/product.js";

const app = express();
dotenv.config();

app.use(cors());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/users", userRoutes);
app.use("/product", productRoutes);

app.get("/", (req, res) => {
  res.send("APP IS RUNNING!");
});

const CONNECTION_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT || 8001;

mongoose.set("strictQuery", false);
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
  )
  .catch((error) => console.log(error.message));
