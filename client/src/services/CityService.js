import $api from "../http";

export default class CityService {
  static async getCities() {
    return $api.get("/getAllCities");
  }

  static async createCity(name) {
    return $api.post("/createCity", { name });
  }
}
