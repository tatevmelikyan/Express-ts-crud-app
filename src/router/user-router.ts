import { Router } from "express";

import { userController } from "../controller/index.js";

const router = Router();

router.get("/users", userController.getUsers);

router.get("/users/:id", userController.getUserById);

router.post("/users", userController.addUser);

router.delete("/users/:id", userController.deleteUser);

router.put("/users/:id", userController.updateUser);

router.put("/users/:id/activate", userController.activateUser);

export default router;
