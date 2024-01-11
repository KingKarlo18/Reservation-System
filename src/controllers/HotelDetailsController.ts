import { Request, Response } from "express";
import { HotelDetailsService } from "../services/HotelDetailsService";

export class HotelDetailsController {
  constructor(private readonly hotelDetailsService: HotelDetailsService) {}

  async getHotelDetails(req: Request, res: Response) {
    try {
      const body = req.body as any;

      if (!body.hotel_id && !body.arrival_date && !body.departure_date) {
        res.status(400).json({ message: "Invalid data input" });
        return;
      }

      const hotelAllDetails = this.hotelDetailsService.getHotelDetails(
        parseInt(body.hotel_id),
        body.arrival_date,
        body.departure_date
      );

      if (!hotelAllDetails) {
        res.status(404).json({ messaage: "Details for hotel are not found" });
        return;
      }

      res.status(201).json({ HotelAllDetails: hotelAllDetails });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server error in getting hotel daetails" });
      return;
    }
  }

  async getHotelDetailsWithParams(req: Request, res: Response) {
    try {
      let hotelId: number;

      if (req.params.hotelId) {
        hotelId = parseInt(req.params.hotelId);
      } else {
        res.status(400).json({ message: "ID is required in the params" });
        return;
      }

      const body = req.body;

      if (!body.hotelId) {
        res.status(400).json({ message: "Invalid hotelId data input in body" });
        return;
      }

      if (parseInt(req.params.hotelId) == parseInt(body.hotelId)) {
        hotelId = body.id;
      } else {
        res.status(400).json({
          message: "ID mismatch between body and params",
        });
        return;
      }

      if (!body.hotel_id && !body.arrival_date && !body.departure_date) {
        res.status(400).json({ message: "Invalid data input" });
        return;
      }

      const hotelAllDetails = this.hotelDetailsService.getHotelDetails(
        hotelId,
        body.arrival_date,
        body.departure_date
      );

      if (!hotelAllDetails) {
        res.status(404).json({ messaage: "Details for hotel are not found" });
        return;
      }

      res.status(201).json({ HotelAllDetails: hotelAllDetails });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server error in getting hotel daetails" });
      return;
    }
  }

  async getHotelMainDetails(req: Request, res: Response) {
    try {
      const body = req.body;

      if (!body.hotel_id && !body.arrival_date && !body.departure_date) {
        res.status(400).json({ message: "Invalid data input" });
        return;
      }

      const hotelMainDetails = this.hotelDetailsService.getHotelMainDetails(
        parseInt(body.hotel_id),
        body.arrival_date,
        body.departure_date
      );

      if (!hotelMainDetails) {
        res.status(404).json({ messaage: "Details for hotel are not found" });
        return;
      }

      res.status(201).json({ HotelAllDetails: hotelMainDetails });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server error in getting hotel daetails" });
      return;
    }
  }
}
