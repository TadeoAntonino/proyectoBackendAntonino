import { UserModel } from "../dao/models/users.models.js";
import CartsService from "./carts.service.js";
import bcrypt from "bcrypt";
import CustomError from "../utils/customError.js";

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
        throw new CustomError(
          "invalid data",
          "información no válida",
          "el usuario ya existe",
          1
        );
      } else {
        console.log("DATA PARSEADA antes de hash", parsedData);

        parsedData.password = bcrypt.hashSync(
          data.password,
          bcrypt.genSaltSync(10)
        );

        console.log("DATA PARSEADA", parsedData);

        const newUserCart = await cartsService;
        const newUser = await UserModel.create({
          ...parsedData,
          cart: newUserCart._id,
        });

        return newUser;
      }
    } catch (error) {
      throw new CustomError(
        "invalid data",
        "información no válida",
        "el usuario ya existe",
        1
      );
      // throw new Error(error.message);
    }
  }

  async getUser(email) {
    try {
      const user = await UserModel.find({ email }).lean();
      console.log("BOLUDEZ", user);

      return user;
    } catch (error) {
      console.log(error);
      throw new CustomError(
        "not found",
        "no se encontró al usuario",
        "el usuario no se ha encontrado",
        3
      );
      // throw new Error(error.message);
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
      throw new CustomError(
        "invalid data",
        "no se porporcionó la información correcta",
        "ingrese nuevamente los datos",
        5
      );
      // throw new Error(error.message);
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
        throw new CustomError(
          "not found",
          "no se encontró el usuario",
          "el usuario no fue encontrado",
          3
        );
        // throw new Error("Usuario no encontrado");
      }
      return user;
    } catch (error) {
      throw new CustomError(
        "not found",
        "no se encontró el usuario",
        "el usuario no fue encontrado",
        3
      );
      // throw new Error(error.message);
    }
  }
}

export default UserService;
