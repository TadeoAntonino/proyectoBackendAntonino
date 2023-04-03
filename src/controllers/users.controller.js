//  import * as userService from "../services/users.service.js";
import factory from "../services/factory.js";

class UserController {
  async createUser(req, res) {
    try {
      const data = req.body;
      const response = await factory.user.createUser(data);
      res.status(201).json({ user: response });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async getUser(req, res) {
    try {
      const { email } = req.params;
      req.session.user = email;
      const user = await factory.user.getUser(email);
      if (user) {
        delete user.password;
        res.json({ user });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUser(req, res) {
    try {
      const { email } = req.params;
      const { body } = req;
      const user = await factory.user.updateUser(email, body);
      res.json(user);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updatePassword(req, res) {
    try {
      const { email } = req.params;
      const { body } = req;
      const user = await factory.user.updateUser(
        email,
        { password: body.password },
        true
      );
      res.json(user);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new UserController();
