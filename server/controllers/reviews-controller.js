const reviewsService = require("../service/reviews-service");
const CityModel = require("../models/city-model");
const mongoose = require("mongoose");
const ApiError = require("../exceptions/api-error");

class ReviewsController {
  async createReviews(req, res, next) {
    try {
      const { title, text, rating, img, city } = req.body;
      const user = req.user;
      const cityName = await CityModel.find({ name: city });
      const author = user.id;
      const reviewsData = await reviewsService.createReviews(
        title,
        text,
        rating,
        img,
        author,
        cityName[0]._id
      );

      return res.json(reviewsData);
    } catch (e) {
      next(e);
    }
  }

  async editReview(req, res, next) {
    try {
      const { id } = req.user;
      const { _id, title, text, img, rating } = req.body;
      const reviewsUpdate = await reviewsService.editReview(
        _id,
        title,
        text,
        img,
        rating
      );

      if (id !== reviewsUpdate.author.toString()) {
        throw ApiError.BadRequest("Вы не можете редактировать чужой отзыв");
      }

      return res.json(reviewsUpdate);
    } catch (e) {
      next(e);
    }
  }

  async getAllUserReviews(req, res, next) {
    try {
      const { id } = req.user;
      const userReviews = await reviewsService.getAllUserReviews(id);

      return res.json(userReviews);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ReviewsController();
