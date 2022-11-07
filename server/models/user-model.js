const {model, Schema} = require("mongoose")

const UserSchema = new Schema({
	fio: {type: String, required: true},
	email: {type: String, unique: true, required: true},
	password: {type: String, required: true},
	phone: {type: String, unique: true, required: true},
	isActivated: {type: Boolean, default: false},
	activationLink: {type: String,}
})

module.exports = model("User", UserSchema)