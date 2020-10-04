const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Diary = require("./diary")

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/node-api-101", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// mock data
const diaries = [
  {
    name: "Tana",
    date: new Date(),
    text:
      "Tired from senior project. Tired from senior project. Tired from senior project.",
    color: "#1e4b7c",
  },
  {
    name: "Tana Again",
    date: new Date(),
    text: "Tired from SDS hw",
    color: "#000000",
  },
];
app.get("/diaries", (req, res) => {
  res.json(diaries);
});
app.post("/diary", (req, res) => {
  const payload = req.body;
  res.json(payload);
});
app.listen(9000, () => {
  console.log("Application is running on port 9000");
});
