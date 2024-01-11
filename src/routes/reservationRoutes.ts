import express, { Request, Response } from "express";
import { User } from "../entities/user";
import AppDataSource from "../data-source";
import { ReservationService } from "../services/database/ReservationService";
import { ReservationController } from "../controllers/ReservationController";
import { Reservation } from "../entities/reservation";
import { Accommodation } from "../entities/accommodation";

const reservationRouter = express.Router();
const reservationService = new ReservationService(
  AppDataSource.getRepository(Reservation),
  AppDataSource.getRepository(User),
  AppDataSource.getRepository(Accommodation)
);
const reservationController = new ReservationController(reservationService);

reservationRouter.use(express.json());

reservationRouter.post(
  "/reservation/create",
  async (req: Request, res: Response) => {
    await reservationController.createReservation(req, res);
  }
);

reservationRouter.get("/reservation", async (req: Request, res: Response) => {
  await reservationController.findReservation(req, res);
});

reservationRouter.get(
  "/user/:id/reservations",
  async (req: Request, res: Response) => {
    await reservationController.getUserReservations(req, res);
  }
);

export default reservationRouter;
