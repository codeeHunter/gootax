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


}

module.exports = new CityService();
