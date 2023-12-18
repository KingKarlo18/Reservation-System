import express, { Request, Response, request } from "express";
import { UserController } from "../controllers/UserController";
import { UserService } from "../services/database/UserService";
import { User } from "../entities/user";
import AppDataSource from "../data-source";

const userRouter = express.Router();
const userService = new UserService(AppDataSource.getRepository(User));
const userController = new UserController(userService);

userRouter.use(express.json());

userRouter.post("/user/create", async (req: Request, res: Response) => {
  await userController.createUser(req, res);
});

userRouter.put("/user/:id/updateUser", async (req: Request, res: Response) => {
  await userController.updateUserData(req, res);
});

userRouter.get("/user", async (req: Request, res: Response) => {
  await userController.findUser(req, res);
});

userRouter.get("/user/:id", async (req: Request, res: Response) => {
  await userController.findUserById(req, res);
});

userRouter.get("/users", async (req: Request, res: Response) => {
  await userController.allUsers(req, res);
});

export default userRouter;
