const mongoose = require("mongoose");
const ReviewsModel = require("../models/reviews-model");

class ReviewsService {
  async createReviews(title, text, rating, img, author, city) {
    const reviews = await ReviewsModel.create({
      title,
      text,
      rating,
      img,
      author,
      city,
    });

    return reviews;
  }

  async editReview(_id, title, text, img, rating) {
    const review = await ReviewsModel.findByIdAndUpdate(_id, {
      title,
      text,
      rating,
      img,
    });

    return review;
  }

  async getAllUserReviews(id) {
    const userReviews = ReviewsModel.find({
      author: mongoose.Types.ObjectId(id),
    });

    return userReviews;
  }
}

module.exports = new ReviewsService();
