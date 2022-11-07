const Router = require("express").Router
const router = new Router()
const userController = require("../controllers/user-controller")
const {body} = require("express-validator")

router.post("/registration",
	body("email").isEmail(),
	body("password").isLength({min: 3, max: 36}),
	userController.registration)
router.post("/login", userController.login)
router.get("/users", userController.users)
router.get("/activate/:link", userController.activate)
router.get("/refresh")

module.exports = router
