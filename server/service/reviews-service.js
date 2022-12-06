const ReviewsModel = require("../models/reviews-model");

class ReviewsService {
  async createReviews(title, text, rating, img, author) {
    try {
      const reviews = await ReviewsModel.create({
        title,
        text,
        rating,
        img,
        author,
      });

      return reviews;
    } catch (e) {
      console.log(e);
    }
  }

  async getAllReviews() {
    try {
      const allReviews = await ReviewsModel.find();

      console.log(allReviews);

      return allReviews;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new ReviewsService();
