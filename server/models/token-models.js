const {model, Schema} = require("mongoose")

const TokenSchema = new Schema({
	user: {type: Schema.Types.ObjectId, ref: "User"},
	accessToken: {type: String, required: true},
})

module.exports = model("Token", TokenSchema)