import { UserModel } from "../dao/models/users.models.js";

export async function createUser(data) {
  try {
    const userExists = await getUser(data.email);
    if (userExists) {
      throw new Error("El usuario ya existe, por favor utilice otro E-Mail 😀");
    } else {
      const user = await UserModel.create(data);
      return user;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUser(email) {
  try {
    const user = await UserModel.find({ email }).lean();
    return user[0];
  } catch (error) {
    throw new Error(error.message);
  }
}
