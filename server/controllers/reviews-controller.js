const reviewsService = require("../service/reviews-service");

class ReviewsController {
  async createReviews(req, res, next) {
    try {
      const { id } = req.user;
      const { title, text, rating, img } = req.body;
      const author = id;
      const reviewsData = await reviewsService.createReviews(
        title,
        text,
        rating,
        img,
        author
      );

      return res.json(reviewsData);
    } catch (e) {
      next(e);
    }
  }

  async getAllReviews(req, res, next) {
    try {
      const allReviews = await reviewsService.getAllReviews();

      return res.json(allReviews);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ReviewsController();
