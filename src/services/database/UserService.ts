import { Repository } from "typeorm";
import { User } from "../../entities/user";

export class UserService {
  constructor(private readonly userRepo: Repository<User>) {}

  async createUser(user: User) {
    const userData = this.userRepo.create({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });

    if ((await this.checkExistenceOfUser(user.email)) == true) {
      throw new Error(`User with email: ${user.email} already exist`);
    } else {
      await this.userRepo.save(userData);
    }
  }

  async findUser(user: User) {
    const userData = await this.userRepo.findOne({
      where: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });

    if (!userData) {
      throw new Error("User not found");
    }

    return userData;
  }

  async updateUserData(oldUser: User, newUserData: User) {
    const existingUser = await this.findUserById(oldUser.id);

    if (!existingUser) {
      throw new Error("User not found");
    }

    await this.userRepo.update(existingUser.id, {
      firstName: newUserData.firstName,
      lastName: newUserData.lastName,
      email: newUserData.email,
      role: newUserData.role,
    });

    const updatedUser = await this.findUser(newUserData);

    return updatedUser;
  }

  async findUserById(userId: number) {
    const userData = await this.userRepo.findOne({
      where: {
        id: userId,
      },
    });
    if (!userData) {
      throw new Error(`User with id: ${userId} not found`);
    }
    return userData;
  }

  async allUsers() {
    const users = await this.userRepo.find();

    if (!users || users.length === 0) {
      throw new Error("Users not found");
    }

    return users;
  }

  async login(userEmail: string) {
    const userData = await this.userRepo.findOne({
      where: {
        email: userEmail,
      },
    });
    if (!userData) {
      throw new Error(`User with email: ${userEmail} not found`);
    }
    return userData;
  }

  private async checkExistenceOfUser(userEmail: string) {
    const user = await this.userRepo.findOne({
      where: {
        email: userEmail,
      },
    });
    if (!user) {
      return false;
    }
    return true;
  }
}
