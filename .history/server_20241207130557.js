import express from "express";
import 

const app = express();

app.get("/", (req, res) => {
  const name = req.query.name;
  res.send("Hello World " + name);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
