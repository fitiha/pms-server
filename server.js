import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import errorHandler from "./src/middlewares/errorHandler.js";
import "express-async-errors";
import userRouter from "./src/routes/user.routes.js";
import projectRouter from "./src/routes/project.routes.js";
import taskRouter from "./src/routes/task.routes.js";
import commentRouter from "./src/routes/comment.routes.js";

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

// Middlewares
app.use(helmet());
app.use(express.json());

// Routes
app.use("/users", userRouter);
app.use("/projects", projectRouter);
app.use("/tasks", taskRouter);
app.use("/comments", commentRouter);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
