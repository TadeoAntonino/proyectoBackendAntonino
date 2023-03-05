import * as AuthService from "./auth.service.js";
import * as UserService from "./users.service.js";

export async function login(email, password) {
  try {
    const isValid = await AuthService.login(email, password);
    if (isValid) {
      const user = await UserService.getUser(email);
      return user;
    } else {
      throw new Error("Usuario o contraseña no validos");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
