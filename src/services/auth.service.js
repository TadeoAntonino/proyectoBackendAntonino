import * as UserService from "../services/users.service.js";
import bcrypt from "bcrypt";

export async function login(email, password) {
  try {
    const user = await UserService.getUser(email);
    if (!user) {
      throw new Error("El usuario buscado no existe");
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
