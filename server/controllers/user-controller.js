const userService = require('../service/user-service')

class UserController {
	async registration(req, res, next) {
		try {
			const {email, password, fio, phone} = req.body
			const userData = await userService.registration(email, password, fio, phone)
			
			return res.json(userData)
		} catch (e) {
			console.log(e)
		}
	}
	
	async login(req, res, next) {
		try {
		
		} catch (e) {
		
		}
	}
	
	async users(req, res, next) {
		try {
			res.json("server work")
		} catch (e) {
		
		}
	}
	
	async activate() {
	
	}
}

module.exports = new UserController()