import * as UserService from "../services/users.service.js";
import bcrypt from "bcrypt";

class AuthService {
  async login(email, password) {
    try {
      const user = await UserService.getUser(email);
      if (!user) {
        console.error("El usuario buscado no existe");
        return false;
      } else {
        const comparaPasswords = bcrypt.compareSync(password, user.password);
        if (comparaPasswords) {
          return true;
        } else {
          return false;
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new AuthService();
