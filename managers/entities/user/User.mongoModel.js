const { default: mongoose } = require("mongoose");
const Keys = require("./utils");
const Counter = require("../autoIncreementSchema/counterModel");
const preCreateDoc = require("../autoIncreementSchema/preFunction");

const keys = [Keys.TEACHER, Keys.STUDENT, Keys.ADMIN, Keys.SUPER_ADMIN];

const User = new mongoose.Schema({
  isActive: {
    type: Boolean,
    default: true,
  },
  id: {
    type: Number,
    default: 0,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    enum: keys,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "schools",
  },
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classrooms",
  },
});

preCreateDoc(User);

const UserModel = mongoose.model("users", User);
module.exports = UserModel;
