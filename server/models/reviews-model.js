const { model, Schema } = require("mongoose");

const ReviewsSchema = new Schema({
  title: { type: String, required: true, unique: false },
  text: { type: String, required: true, unique: false },
  rating: { type: Number, required: true, unique: false },
  img: { type: String, required: true, unique: false },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  city: { type: Schema.Types.ObjectId, ref: "City" },
  dateCreate: { type: Date, default: Date.now },
});

module.exports = model("Reviews", ReviewsSchema);
