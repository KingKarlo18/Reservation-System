import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./src/entities/user";
import { subscribe } from "diagnostics_channel";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./main.sqlite",
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers:[],
  migrations: []
});
