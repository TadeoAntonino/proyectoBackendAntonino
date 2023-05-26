import { UserModel } from "../dao/models/users.models.js";
import CartsService from "./carts.service.js";
import bcrypt from "bcrypt";

/* Instancia */

const cartsServiceInstance = new CartsService();
const cartsService = cartsServiceInstance.addCart();

class UserService {
  async createUser(data) {
    try {
      const userExists = await this.getUser(data.email);
      const parsedData = data;

      console.log(userExists);
      if (userExists.length) {
        throw new Error(error.message);
      } else {
        parsedData.password = bcrypt.hashSync(
          data.password,
          bcrypt.genSaltSync(10)
        );
        const newUserCart = await cartsService;
        const newUser = await UserModel.create({
          ...parsedData,
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

  async getUsers() {
    try {
      const data = await UserModel.find();
      return data;
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

  async addDocs() {}
}

export default UserService;
