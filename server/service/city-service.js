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

  async getAllCities() {
    const cities = await CityModel.find();

    return cities;
  }
}

module.exports = new CityService();
