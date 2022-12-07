const Router = require("express").Router;
const { body } = require("express-validator");
const router = new Router();
const userController = require("../controllers/user-controller");
const reviewsController = require("../controllers/reviews-controller");
const cityController = require("../controllers/city-controllers");
const authMiddleware = require("../middlewares/auth-middleware");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 36 }),
  userController.registration
);
router.post("/login", userController.login);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);
router.post(
  "/createReviews",
  authMiddleware,
  body("rating").isLength({ min: 1, max: 5 }),
  body("text").isLength({ min: 1, max: 255 }),
  body("title").isLength({ min: 1, max: 100 }),
  reviewsController.createReviews
);
router.post("/editReview", authMiddleware, reviewsController.editReview);
router.get(
  "/getAllUserReviews",
  authMiddleware,
  reviewsController.getAllUserReviews
);
router.post("/createCity", authMiddleware, cityController.createCity);

module.exports = router;
