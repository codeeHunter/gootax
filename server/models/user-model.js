const {model, Schema} = require("mongoose")

const UserSchema = new Schema({
	fio: {type: String,},
	email: {type: String, unique: true, required: true},
	password: {type: String, required: true},
	phone: {type: String, unique: true,},
	isActivated: {type: Boolean, default: false},
	activationLink: {type: String,}
})

module.exports = model("User", UserSchema)
