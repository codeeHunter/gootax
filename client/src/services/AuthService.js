import $api from "../http";

export default class AuthService {
  static async login(email, password) {
    return $api.post("/login", { email, password });
  }

  static async registration(fio, email, phoneNumber, password) {
    return $api.post("/registration", { fio, email, phoneNumber, password });
  }
}
