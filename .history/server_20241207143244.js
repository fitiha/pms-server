import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import userRouter from "./src/routes/user.routes.js";

const app = express();

// Middlewares
app.use(helmet());
app.use(express.json());

dotenv.config();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  const name = req.query.name;
  res.send("PM " + name);
});

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
