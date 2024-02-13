const { default: mongoose } = require("mongoose");
const preCreateDoc = require("../autoIncreementSchema/preFunction");

const Classroom = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "schools",
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  totalStudents: {
    type: Number,
    default: 0,
  },
});

preCreateDoc(Classroom);

const ClassroomModel = mongoose.model("classrooms", Classroom);

module.exports = ClassroomModel;
