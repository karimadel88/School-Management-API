/**
 * Event To Add auto increment id
 * @param {*} Model
 */

const Counter = require("./counterModel");

const preCreateDoc = (Model) => {
  console.log("Model", Model);
  Model.pre("save", function (next) {
    const doc = this;
    const modelName = doc.constructor.modelName;
    if (this.isNew) {
      Counter.findOneAndUpdate(
        { model: modelName },
        { $inc: { seq: 1 } },
        { new: true }
      )
        .then((counter) => {
          doc.id = counter.seq;
          next();
        })
        .catch((err) => {
          return next(err);
        });
    } else {
      next();
    }
  });
};

module.exports = preCreateDoc;
