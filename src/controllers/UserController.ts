import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { User } from "../entities/user";
import { UserService } from "../services/database/UserService";
import { Request, Response } from "express";
import util from "util";

export class UserController {
  constructor(private userService: UserService) {}

  async createUser(req: Request, res: Response) {
    try {
      const userReal = req.body as any;
      const user: User = plainToClass(User, req.body);
      const errors = await validate(user);

      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      await this.userService.createUser(user);

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error Kod kreiranja" });
    }
  }

  async findUser(req: Request, res: Response) {
    try {
      const user: User = plainToClass(User, req.body);
      const errors = await validate(user);

      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      const foundUser = await this.userService.findUser(user);

      if (!foundUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res
        .status(201)
        .json({ user: foundUser, message: "User found successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async findUserById(req: Request, res: Response) {
    try {
      let userId: number;

      if (req.params.id) {
        userId = parseInt(req.params.id);
      } else {
        res.status(400).json({ message: "ID is required in the params" });
        return;
      }

      const request = req.body as any;

      if (!request && request.id) {
        userId = request.id;
      }

      const foundUser = await this.userService.findUserById(userId);

      if (!foundUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res
        .status(200)
        .json({ user: foundUser, message: "User found successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateUserData(req: Request, res: Response) {
    try {
      const body = req.body as any;

      const paramId: number = parseInt(req.params.id);

      const oldUser: User = plainToClass(User, body.oldUser);
      const newUserData: User = plainToClass(User, body.newUserData);

      const errorsOldUser = await validate(oldUser);
      const errorsNewUserData = await validate(newUserData);

      if (errorsOldUser.length > 0 || errorsNewUserData.length > 0) {
        res.status(400).json({
          errorsOldUser: errorsOldUser,
          errorsNewUserData: errorsNewUserData,
        });
        return;
      }

      if (body.id && body.id !== paramId) {
        res.status(400).json({ error: "ID mismatch between body and params" });
        return;
      }

      const updatedUser = await this.userService.updateUserData(
        oldUser,
        newUserData
      );

      res
        .status(200)
        .json({ user: updatedUser, message: "User updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async allUsers(req: Request, res: Response) {
    try {
      const allUsers = await this.userService.allUsers();

      if (!allUsers) {
        res.status(404).json({ message: "There are no users" });
        return;
      }

      res
        .status(201)
        .json({ user: allUsers, message: "Users found successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
