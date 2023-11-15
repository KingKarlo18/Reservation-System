import "reflect-metadata";
import { AppDataSource } from "./data-source";

AppDataSource.initialize();

function startingReservationSystem(): string {
  return "Starting Reservation System";
}

console.log(startingReservationSystem());
