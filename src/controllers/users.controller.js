import UserService from "../services/users.service.js";

const UserServiceInstance = new UserService();
const userService = UserServiceInstance;

class UserController {
  static #instance;

  async createUser(req, res) {
    try {
      const data = req.body;
      const response = await userService.createUser(data);
      res.status(201).json({ user: response });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async getUser(req, res) {
    try {
      const { email } = req.params;
      req.session.user = email;
      const user = await userService.getUser(email);
      if (user) {
        delete user.password;
        res.json({ user });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUsers(req, res) {
    try {
      const users = await userService.getUsers({});
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUser(req, res) {
    try {
      const { email } = req.params;
      const { body } = req;
      const user = await userService.updateUser(email, body);
      res.json(user);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updatePassword(req, res) {
    try {
      const { email } = req.params;
      const { body } = req;
      const user = await userService.updateUser(
        email,
        { password: body.password },
        true
      );
      res.json(user);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async changeRole(uid) {
    const user = await userService.getUserById(uid);

    if (!user) {
      throw new Error(`Usuario no encontrado con id: ${uid}`);
    }

    if (user.role === "admin") {
      throw new Error("No se puede cambiar el rol de un usuario admin");
    }

    const newRole = user.role === "user" ? "premium" : "user";

    user.role = newRole;

    await userService.updateUser(email, role);

    return user;
  }

  async uploadDocs() {
    try {
      console.log("Documentos cargados");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static getInstance() {
    if (this.#instance) {
      return this.#instance;
    }

    this.#instance = new UserController();
    return this.#instance;
  }
}

export default UserController.getInstance();
