import { Request, Response } from "express";
import { ReservationService } from "../services/database/ReservationService";

export class ReservationController {
  constructor(private reservationService: ReservationService) {}

  async createReservation(req: Request, res: Response) {
    try {
      const { userId, accommodationId, arrivalDate, departureDate } = req.body;

      if (!userId && !accommodationId && !arrivalDate && !departureDate) {
        res.status(400).json({
          message: "Invalid create reservation data input",
        });
        return;
      }

      const reservation = await this.reservationService.createReservation(
        userId,
        accommodationId,
        arrivalDate,
        departureDate
      );

      res.status(201).json({
        reservation: reservation,
        message: "Reservation created successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal Server Error With Creating Reservation",
      });
    }
  }

  async findReservation(req: Request, res: Response) {
    try {
      const { userId, accommodationId } = req.body;

      if (!userId && !accommodationId) {
        res.status(400).json({
          message: "Invalid find reservation data input",
        });
        return;
      }

      const reservation = await this.reservationService.findReservation(
        parseInt(userId),
        parseInt(accommodationId)
      );

      if (!reservation) {
        res.status(400).json({
          message: "Reservation not found",
        });
        return;
      }

      res.status(200).json({
        reservation: reservation,
        message: "Reservation found successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Internal Server Error With Finding Reservation",
      });
    }
  }

  async getUserReservations(req: Request, res: Response) {
    try {
      const userIdParam = req.params.id;

      if (!userIdParam) {
        res.status(400).json({
          message: "ID is required in the params",
        });
        return;
      }

      const userIdBody = parseInt(req.body.userId);

      if (!userIdBody) {
        res.status(400).json({
          message: "User Id in body not found",
        });
        return;
      }

      if (userIdBody != parseInt(userIdParam)) {
        res.status(400).json({
          message: "ID mismatch between body and params",
        });
        return;
      }

      const userReservations =
        await this.reservationService.getUserReservations(userIdBody);

      if (!userReservations) {
        res.status(400).json({
          message: "User reservations not found",
        });
        return;
      }

      res.status(200).json({
        userReservations,
        message: "User reservations found successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Internal Server Error With Getting User Reservations",
      });
    }
  }
}
