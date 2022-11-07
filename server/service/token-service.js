const jwt = require("jsonwebtoken")
const tokenModel = require("../models/token-models")

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "2h"})
		
		return {accessToken}
	}
	
	async saveToken(userId, accessToken) {
		const tokenData = await tokenModel.findOne({user: userId})
		
		if(tokenData) {
			tokenData.accessToken = accessToken
			
			return tokenData.save()
		}
		
		const token = await tokenModel.create({user: userId, accessToken})
		return token;
	}
}

module.exports = new TokenService()