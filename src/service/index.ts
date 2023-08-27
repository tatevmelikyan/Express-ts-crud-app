import { UserService } from "./user-service.js";
import path from "path";

const __dirname = process.cwd();

const filePath = path.join(__dirname, "data.json");

export const userService = new UserService(filePath);
