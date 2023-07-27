const mongoose = require("mongoose");

const MCESchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mcqArray: {
    type: Array,
    required: true,
  },
});

const MCEModel = mongoose.model("mcqobjects", MCESchema);
module.exports = MCEModel;
