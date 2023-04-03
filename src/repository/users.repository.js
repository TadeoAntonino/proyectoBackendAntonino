import UserDTO from "../DTOs/usersDTO.js";

export class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async createUser(data) {
    const user = await this.dao.createUser(data);
    const userDTO = new UserDTO(user);
    return userDTO;
  }
  async getUser(email) {
    const user = await this.dao.getUser(email);
    const userDTO = new UserDTO(user);
    return userDTO;
  }
  async getUserById(id) {
    const user = await this.dao.getUserById(id);
    const userDTO = new UserDTO(user);
    return userDTO;
  }
  async updateUser(email, data, updatePass = false) {
    const user = await this.dao.updateUser(email, data, (updatePass = false));
    const userDTO = new UserDTO(user);
    return userDTO;
  }
}
