import config from "../config/config.js";
import { UserRepository } from "../repository/users.repository.js";

let factory;

switch (config.PERSISTENCIA) {
  case "mongodb":
    console.log("Persistencia seleccionada MongoDB");
    await import("../config/db.js");
    const { default: userService } = await import("./users.service.js");
    factory = {
      user: new UserRepository(userService),
    };
    break;
  //   case "file":
  //     console.log("Persistencia seleccionada FileSystem");
  //     break;
}

export default factory;
