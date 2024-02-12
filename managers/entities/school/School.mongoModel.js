const { default: mongoose } = require("mongoose");

const School = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  students: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  website: {
    type: String,
    required: true,
  },
});

const SchoolModel = mongoose.model("schools", School);

module.exports = SchoolModel;
