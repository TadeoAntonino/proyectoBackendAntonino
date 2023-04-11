import AuthService from "../services/auth.service.js";

/* Instancias */

const authServiceInstance = new AuthService();
const authService = authServiceInstance;

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const logged = await authService.login(email, password);
      if (logged) {
        req.session.logged = true;
        res.send("Usuario registrado");
      } else {
        res.status(400).send("Usuario y/o contraseña no válidos");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async logout(req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          res.json(err);
        } else {
          res.send("Sesión cerrada con éxito");
        }
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new AuthController();
