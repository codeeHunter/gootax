const cityService = require("../service/city-service");

class CityService {
  async createCity(req, res, next) {
    try {
      const { name } = req.body;
      const city = await cityService.createCity(name);

      return res.json(city);
    } catch (e) {
      next(e);
    }
  }

  async getAllCities(req, res, next) {
    try {
      const cities = await cityService.getAllCities();

      return res.json(cities);
    } catch (e) {
      connsole.log(e)
    }
  }
}

module.exports = new CityService();
