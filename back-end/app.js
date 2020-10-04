const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const Diary = require("./diary");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://mongo:27017/SDS_HW", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.get("/diaries", async (req, res) => {
  const diaries = await Diary.find({});
  res.json(diaries);
  console.log("GET")
});
app.post("/diary", async (req, res) => {
  const payload = req.body.newDiary;
  const diary = new Diary(payload);
  await diary.save();
  res.status(201).end();
  console.log("GET")
});
app.listen(9000, () => {
  console.log("Application is running on port 9000, new port");
});
