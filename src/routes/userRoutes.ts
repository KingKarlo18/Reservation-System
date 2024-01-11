import express, { Request, Response, request } from "express";
import { UserController } from "../controllers/UserController";
import { UserService } from "../services/database/UserService";
import { User } from "../entities/user";
import AppDataSource from "../data-source";
import { authenticateToken } from "../plugins/jwt";

const userRouter = express.Router();
const userService = new UserService(AppDataSource.getRepository(User));
const userController = new UserController(userService);

userRouter.use(express.json());

userRouter.post(
  "/user/create",

  async (req: Request, res: Response) => {
    await userController.createUser(req, res);
  }
);

userRouter.put(
  "/user/:id/updateUser",
  authenticateToken,
  async (req: Request, res: Response) => {
    await userController.updateUserData(req, res);
  }
);

userRouter.get(
  "/user",
  authenticateToken,
  async (req: Request, res: Response) => {
    await userController.findUser(req, res);
  }
);

userRouter.get(
  "/user/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    await userController.findUserById(req, res);
  }
);

userRouter.get(
  "/users",
  authenticateToken,
  async (req: Request, res: Response) => {
    await userController.allUsers(req, res);
  }
);

userRouter.get(
  "/login",

  async (req: Request, res: Response) => {
    await userController.login(req, res);
  }
);

export default userRouter;
