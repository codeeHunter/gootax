import $api from "../http";

export default class ReviewsService {
  static async getReviews(cityId) {
    return $api.get(`/getReviews/${cityId}`);
  }
}
