const Router = require("express").Router
const router = new Router()
const userController = require("../controllers/user-controller")
const {body} = require("express-validator")
const authMiddleware = require("../middlewares/auth-middleware")

router.post("/registration",
	body("email").isEmail(),
	body("password").isLength({min: 3, max: 36}),
	userController.registration)
router.post("/login", userController.login)
router.get("/activate/:link", userController.activate)
router.get("/refresh", userController.refresh)
router.get("/users", authMiddleware, userController.getUsers )

module.exports = router
