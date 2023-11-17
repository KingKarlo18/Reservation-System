import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "test",
  password: "test",
  database: "test",
  synchronize: true,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: [],
});

export function initializeDataSource(): Promise<DataSource> {
  return AppDataSource.initialize();
}
