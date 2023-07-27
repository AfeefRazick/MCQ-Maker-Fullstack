const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MCEModel = require("./models/mcq");
const cors = require("cors");

mongoose.connect(
  "mongodb+srv://afeefrazickamir:affeeffcode@cluster0.gcmiv08.mongodb.net/mcqmaker?retryWrites=true&w=majority"
);

app.use(express.json());
app.use(cors());

app.get("/:id", (req, res) => {
  MCEModel.findById(req.params.id).then((err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createmce", async (req, res) => {
  const data = req.body;
  const newMCE = new MCEModel(data);
  await newMCE.save().then((document) => {
    res.json(document);
  });
});

app.listen(3002, () => {
  console.log("poorgtrp");
});
