import { IUpdateUserPayload, IUser, IUserPayload } from "../types.js";
import { readFile, writeFile } from "fs/promises";
import { v4 as uuid } from "uuid";

export class UserService {
  private users: IUser[] = [];

  constructor(private filepath: string) {}

  private async readUsersFromFile() {
    try {
      const data = await readFile(this.filepath, "utf-8");
      this.users = JSON.parse(data);
    } catch (err) {
      throw new Error("Failed to read users from file.");
    }
  }

  private async writeUsersToFile() {
    try {
      await writeFile(this.filepath, JSON.stringify(this.users));
    } catch (err) {
      throw new Error("Failed to write users to file.");
    }
  }

  async fetchUsers() {
    await this.readUsersFromFile();
    return this.users;
  }

  async fetchUserById(id: string) {
    await this.readUsersFromFile();
    return this.users.find((user) => user.id === id);
  }

  async createUser(userPayload: IUserPayload): Promise<IUser> {
    await this.readUsersFromFile();
    const newUser = {
      id: uuid(),
      ...userPayload,
      status: false,
      creationTimestamp: Date.now(),
      modificationTimestamp: Date.now(),
    };
    this.users.push(newUser);
    await this.writeUsersToFile();
    return newUser;
  }

  async deleteUserById(id: string) {
    await this.readUsersFromFile();
    this.users = this.users.filter((user) => user.id !== id);
    await this.writeUsersToFile();
  }

  async updateUserById(id: string, userPayload: IUpdateUserPayload) {
    await this.readUsersFromFile();
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...userPayload, modificationTimestamp: Date.now() };
      }
      return user;
    });
    await this.writeUsersToFile();
    const updatedUser = await this.fetchUserById(id);
    return updatedUser;
  }

  async activateUserById(id: string) {
    await this.readUsersFromFile();
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, status: true, modificationTimestamp: Date.now() };
      }
      return user;
    });
    await this.writeUsersToFile();
    const activatedUser = await this.fetchUserById(id);
    return activatedUser;
  }
}
