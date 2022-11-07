const UserModel = require("../models/user-model")
const bcrypt = require("bcrypt")
const uuid = require("uuid")
const mailService = require("./mail-service")
const tokenService = require("./token-service")
const UserDto = require("../dtos/user-dto")
const ApiError = require("../exceptions/api-error")

class UserService {
	async registration(email, password, fio, phone) {
		const candidate = await UserModel.findOne({email})
		
		if (candidate) {
			throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже зарегистрирован.`)
		}
		
		const activationLink = uuid.v4();
		const hashPassword = await bcrypt.hash(password, 3)
		
		const user = await UserModel.create({email, password: hashPassword, fio, phone, activationLink})
		await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
		
		const userDto = new UserDto(user) // id, email, isActivated, fio, phone
		const token = tokenService.generateTokens({...userDto})
		await tokenService.saveToken(userDto.id, token.accessToken)
		
		return {...token, user: userDto}
	}
	
	async activate(activationLink) {
		const user = await UserModel.findOne({activationLink})
		
		if(!user) {
			throw ApiError.BadRequest(`Некорректная ссылка активации`)
		}
		user.isActivated = true
		await user.save()
	}
	
	async login(email, password) {
		const user = await UserModel.findOne({email})
		if(!user) {
			throw ApiError.BadRequest("Пользователь c таким email не найден")
		}
		
		const isPassEquals = await bcrypt.compare(password, user.password)
		if(!isPassEquals) {
			throw ApiError.BadRequest("Неверный пароль")
		}
		const userDto = new UserDto(user)
		const token = tokenService.generateTokens({...userDto})
		
		await tokenService.saveToken(userDto.id, token.accessToken)
		return {...token, user: userDto}
	}
}

module.exports = new UserService()
