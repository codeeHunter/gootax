const {model, Schema} = require("mongoose")

const ReviewsSchema = new Schema({
	title: {type: String,},
	text: {type: String, required: true},
	rating: {type: String, unique: true, required: true},
	img: {type: String,},
	id_author: {type: Schema.Types.ObjectId, ref: "User"}
})

module.exports = model("Reviews", ReviewsSchema)