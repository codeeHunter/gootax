const { Schema, model } = require("mongoose");

const CitySchema = new Schema({
  name: { type: String, require: true, unique: true },
  dateCreate: { type: Date, default: Date.now },
});

module.exports = model("City", CitySchema);
