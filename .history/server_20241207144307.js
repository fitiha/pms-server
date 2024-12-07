import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import userRouter from "./src/routes/user.routes.js";
import errorHandler from "./src/middleware/errorMiddleware.js";
import "express-async-errors"; // Import this package to handle async errors

const app = express();

// Middlewares
app.use(helmet());
app.use(express.json());

dotenv.config();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  const name = req.query.name;
  res.send("PMS " + name);
});

app.use("/user", userRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});