import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import userRouter from "./src/routes/user.routes";
import errorHandler from "./src/middlewares/errorHandler";
import "express-async-errors";

const app = express();

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(errorHandler);

dotenv.config();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  const name = req.query.name;
  res.send("PMS " + name);
});

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
