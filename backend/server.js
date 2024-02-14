import path from "path";
import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import tripRoutes from "./routes/tripRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import usersRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errormidleware.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import morgan from "morgan";
connectDB();
dotenv.config();

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/trips", tripRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", orderRoutes);
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
app.use("/api/upload", uploadRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server pokrenut u ${process.env.NODE_ENV} modu na portu ${PORT}`)
);
