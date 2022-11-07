module.exports = class UserDto {
	email;
	id;
	isActivated;
	phone;
	fio;
	
	constructor(model) {
		this.email = model.email
		this.id = model._id
		this.isActivated = model.isActivated
		this.phone = model.phone
		this.fio = model.fio
	}
}