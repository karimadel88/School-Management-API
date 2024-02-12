const { default: mongoose } = require("mongoose");

const User = new mongoose.Schema({
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
    default: "user",
  },
});

const UserModel = mongoose.model("users", User);

module.exports = UserModel;
