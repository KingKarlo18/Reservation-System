import { DataSource } from "typeorm";
import { User } from "./entities/user";
import { Review } from "./entities/review";
import { Accommodation } from "./entities/accommodation";
import { Reservation } from "./entities/reservation";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./main.sqlite",
  synchronize: true,
  logging: true,
  entities: [Reservation, Accommodation, User, Review],
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize()
  .then(() => {})
  .catch((error) => console.log(error));

export function initializeDataSource(): Promise<DataSource> {
  return AppDataSource.initialize();
}

export default AppDataSource;
