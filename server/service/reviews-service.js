const mongoose = require("mongoose");
const ReviewsModel = require("../models/reviews-model");
const userModel = require("../models/user-model");

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

  async getAllReviews(cityId) {
    const reviews = await ReviewsModel.find({
      city: mongoose.Types.ObjectId(cityId),
    });

    

    const authors = await userModel.find();

    reviews.forEach((item) => {
      authors.forEach((author) => {
        if (item.author.toString() === author._id.toString()) {
          item.author = author;
        }
      });
    });
    console.log(reviews)


    return reviews;
  }
}

module.exports = new ReviewsService();
