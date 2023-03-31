const db = require("mongoose");
const schame = new db.Schema({
  _name: {
    type: String,
    require: true,
  },
  _price: {
    type: Number,
    require: true,
  },
  _amount: {
    type: Number,
    default: 0,
  },
});

const model = new db.model("baitap9s", schame);
module.exports = model;
