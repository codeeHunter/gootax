import $api from "../http";

export default class ReviewsService {
  static async getReviews(cityId) {
    return $api.get(`/getReviews/${cityId}`);
  }

  static async createReviews(image, title, text, rating, city) {
    return $api.post(
      "/createReviews",
      { title, text, rating, city, image },
      {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data;`,
        },
      }
    );
  }

  static async editReviews(_id, title, text, image, rating) {
    return $api.post(`/editReviews`, { _id, title, text, rating });
  }
}
