import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import userRouter from "./src/routes/user.routes.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import "express-async-errors";

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(errorHandler);

dotenv.config();

app.use("/user", userRouter);
app.use("/project", projectRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
