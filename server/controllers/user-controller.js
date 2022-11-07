const userService = require('../service/user-service')
const {validationResult} = require("express-validator")
const ApiError = require("../exceptions/api-error")
class UserController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req);
			if(!errors.isEmpty()) {
				return next(ApiError.BadRequest("Ошибка при валидации", errors.array()))
			}
			const {email, password, fio, phone} = req.body
			const userData = await userService.registration(email, password, fio, phone)
			
			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}
	
	async login(req, res, next) {
		try {
			const {email, password} = req.body
			const userData = await userService.login(email, password)

			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}
	
	async users(req, res, next) {
		try {
			res.json("server work")
		} catch (e) {
		
		}
	}
	
	async activate(req, res, next) {
		try {
			const activationLink = req.params.link
			await userService.activate(activationLink)
			return res.redirect(process.env.CLIENT_URL)
		} catch (e) {
			next(e)
		}
	}
}

module.exports = new UserController()
