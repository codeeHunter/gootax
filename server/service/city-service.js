const CityModel = require("../models/city-model");
const ApiError = require("../exceptions/api-error");

class CityService {
  async createCity(name) {
    const candidateCity = await CityModel.findOne({ name });

    if (candidateCity) {
      throw ApiError.BadRequest(`Город: ${name} уже есть базе.`);
    }

    const city = await CityModel.create({ name });

    return city;
  }
}

module.exports = new CityService();
