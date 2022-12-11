const Router = require("express").Router;
const { body } = require("express-validator");
const router = new Router();

const userController = require("../controllers/user-controller");
const reviewsController = require("../controllers/reviews-controller");
const cityController = require("../controllers/city-controllers");

const authMiddleware = require("../middlewares/auth-middleware");
const uploadMiddleware = require("../middlewares/uploadFile-middleware");

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
  uploadMiddleware.single("image"),
  body("rating").isLength({ min: 1, max: 5 }),
  body("text").isLength({ min: 1, max: 255 }),
  body("title").isLength({ min: 1, max: 100 }),
  reviewsController.createReviews
);
router.post(
  "/editReviews",
  authMiddleware,
  uploadMiddleware.single("image"),
  reviewsController.editReview
);
router.get("/getReviews/:id", reviewsController.getAllReviews);
router.get("/getAllCities", cityController.getAllCities);
router.get(
  "/getAllUserReviews/:id",
  authMiddleware,
  reviewsController.getAllUserReviews
);
router.post("/createCity", authMiddleware, cityController.createCity);

module.exports = router;
