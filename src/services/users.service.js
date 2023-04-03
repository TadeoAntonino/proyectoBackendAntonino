import { UserModel } from "../dao/models/users.models.js";
import * as cartsService from "./carts.service.js";
import bcrypt from "bcrypt";

class UserService {
  async createUser(data) {
    try {
      const userExists = await getUser(data.email);
      if (userExists) {
        throw new Error(
          "El usuario ya existe, por favor utilice otro E-Mail 😀"
        );
      } else {
        data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));

        const newUserCart = await cartsService.addCart();

        const newUser = await UserModel.create({
          ...data,
          cart: newUserCart._id,
        });
        return newUser;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUser(email) {
    try {
      const user = await UserModel.find({ email }).lean();
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUser(email, data, updatePass = false) {
    try {
      const user = await getUser(email);
      if (user) {
        if (data.password) {
          if (updatePass) {
            data.password = bcrypt.hashSync(
              data.password,
              bcrypt.genSaltSync(10)
            );
          } else {
            delete data.password;
          }
        }
        const user = await UserModel.findOneAndUpdate(
          { email },
          { ...data },
          { new: true }
        );
        return user;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserById(id) {
    try {
      const user = await UserModel.findById(id)
        .populate({
          path: "cart",
          populate: {
            path: "products.product",
          },
        })
        .lean();
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new UserService();
