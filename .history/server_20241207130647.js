import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const 

app.get("/", (req, res) => {
  const name = req.query.name;
  res.send("Hello World " + name);
});

app.listen(, () => {
  console.log("Server is running on http://localhost:3000");
});
