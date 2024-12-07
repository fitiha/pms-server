import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";

const app = express();

// Middlewares
app.use(helmet);
app.use(express.json());


dotenv.config();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  const name = req.query.name;
  res.send("Hello World " + name);
});

app.use("/user")



app.listen(port, () => {
  console.log("Server is running on http://localhost:3000");
});
