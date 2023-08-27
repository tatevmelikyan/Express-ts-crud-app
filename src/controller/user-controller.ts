import { Request, Response } from "express";

import { UserService } from "../service/user-service.js";
import { IUpdateUserPayload, IUserPayload } from "../types.js";
import { sendResponse } from "../utils/response-utils.js";
import { validateUpdateUserPayload, validateUserPayload } from "../utils/validation-utils.js";

export class UserController {
  constructor(private userService: UserService) {}

  getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.userService.fetchUsers();
      sendResponse(res, 200, result);
    } catch (err) {
      console.log(err);
      sendResponse(res, 500, null, "Internal server error: Failed to fetch users.");
    }
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const result = await this.userService.fetchUserById(id);
      if (result === undefined) {
        sendResponse(res, 404, null, "Not found");
      } else {
        sendResponse(res, 200, result);
      }
    } catch (err) {
      console.log(err);
      sendResponse(res, 500, "Internal server error: Failed to fetch user.");
    }
  };

  addUser = async (req: Request, res: Response): Promise<void> => {
    const userPayload: IUserPayload = req.body;

    const validationResult = validateUserPayload(userPayload);

    if (validationResult.error) {
      sendResponse(res, 400, null, validationResult.error.message);
    } else {
      try {
        const newUser = await this.userService.createUser(userPayload);
        sendResponse(res, 201, newUser);
      } catch (err) {
        console.log(err);
        sendResponse(res, 500, null, "Internal server error: Failed to create user.");
      }
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      await this.userService.deleteUserById(id);
      sendResponse(res, 200, "User successfully deleted.");
    } catch (err) {
      console.log(err);
      sendResponse(res, 500, null, "Internal server error: Failed to delete user.");
    }
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const userPayload: IUpdateUserPayload = req.body;

    const validationResult = validateUpdateUserPayload(userPayload);

    if (validationResult.error) {
      sendResponse(res, 400, null, validationResult.error.message);
    } else {
      try {
        const updatedUser = await this.userService.updateUserById(id, userPayload);
        if (!updatedUser) {
          return sendResponse(res, 404, null, "Not Found");
        }
        sendResponse(res, 200, updatedUser);
      } catch (err) {
        console.log(err);
        sendResponse(res, 500, null, "Internal server error: Failed to update user.");
      }
    }
  };

  activateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const activatedUser = await this.userService.activateUserById(id);
      sendResponse(res, 200, activatedUser);
    } catch (err) {
      console.log(err);
      sendResponse(res, 500, null, "Internal server error: Failed to activate user.");
    }
  };
}
