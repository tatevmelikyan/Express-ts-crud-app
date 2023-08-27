import { userService } from "../service/index.js";
import { UserController } from "./user-controller.js";

export const userController = new UserController(userService);
