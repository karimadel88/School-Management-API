const { default: mongoose } = require("mongoose");
const preCreateDoc = require("../autoIncreementSchema/preFunction");

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
  schoolManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  classrooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "classrooms",
    },
  ],
  totalStudents: {
    type: Number,
    default: 0,
  },
  totalClassrooms: {
    type: Number,
    default: 0,
  },
});

preCreateDoc(School);

const SchoolModel = mongoose.model("schools", School);

module.exports = SchoolModel;
