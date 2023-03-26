export default class UserDTO {
  constructor(user) {
    (this.id = user._id || user.id),
      (this.firstName = user.firstName),
      (this.lastName = user.lastName),
      (this.email = user.email),
      (this.age = user.age),
      (this.role = user.role),
      (this.password = user.password),
      (this.cart = user.cart);
  }
}
