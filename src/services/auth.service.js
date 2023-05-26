import UserService from "../services/users.service.js";
import bcrypt from "bcrypt";

/* Instancias */

const userServiceInstance = new UserService();
const userService = userServiceInstance;

class AuthService {
  async login(email, password) {
    try {
      const user = await userService.getUser(email);
      if (!user?.length) {
        return false;
      } else {
        const comparaPasswords = bcrypt.compareSync(
          password,
          user[0]?.password
        );
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

export default AuthService;
