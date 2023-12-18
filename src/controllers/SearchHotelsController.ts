import { Request, Response } from "express";
import { SearchHotelsService } from "../services/SearchHotelsService";

export class SearchHotelsController {
  constructor(private searchHotelsService: SearchHotelsService) {}

  async searchHotels(req: Request, res: Response) {
    try {
      const body = req.body as any;

      if (
        !body.destId ||
        !body.search_type ||
        !body.arrival_date ||
        !body.departure_date
      ) {
        res.status(400).json({ error: "Invalid input data." });
        return;
      }

      const hotels = this.searchHotelsService.searchHotels(
        parseInt(body.destId),
        body.search_type,
        body.arrival_date,
        body.departure_date
      );

      if (!hotels) {
        res.status(404).json({ message: "There are no hotels found" });
        return;
      }

      res.status(201).json({ searched_hotels: hotels });
    } catch (error) {
      console.log(error);
      res
        .status(501)
        .json({ error: "Internal server error in searching hotels" });
    }
  }

  async getFirstHotel(req: Request, res: Response) {
    try {
      const body = req.body as any;

      if (
        !body.destId ||
        !body.search_type ||
        !body.arrival_date ||
        !body.departure_date
      ) {
        res
          .status(400)
          .json({ error: "Invalid input data. All fields are required." });
        return;
      }
      const firstHotel = this.searchHotelsService.getFirstHotel(
        parseInt(body.destId),
        body.search_type,
        body.arrival_date,
        body.departure_date
      );

      if (!firstHotel) {
        res.status(404).json({ message: "There are no hotel found" });
        return;
      }

      res.status(201).json({ firstHotel: firstHotel });
    } catch (error) {
      console.log(error);
      res
        .status(501)
        .json({ error: "Internal server error in searching first hotel" });
    }
  }

  async getFirstHotelId(req: Request, res: Response) {
    try {
      const body = req.body as any;

      if (
        !body.destId ||
        !body.search_type ||
        !body.arrival_date ||
        !body.departure_date
      ) {
        res
          .status(400)
          .json({ error: "Invalid input data. All fields are required." });
        return;
      }
      const firstHotelId = this.searchHotelsService.getFirstHotel(
        parseInt(body.destId),
        body.search_type,
        body.arrival_date,
        body.departure_date
      );

      if (!firstHotelId) {
        res.status(404).json({ message: "There are no hotel id found" });
        return;
      }

      res.status(201).json({ firstHotelId: firstHotelId });
    } catch (error) {
      console.log(error);
      res
        .status(501)
        .json({ error: "Internal server error in searching first hotel id" });
    }
  }

  async getFirstHotelAccesibilityLabel(req: Request, res: Response) {
    try {
      const body = req.body as any;

      if (
        !body.destId ||
        !body.search_type ||
        !body.arrival_date ||
        !body.departure_date
      ) {
        res
          .status(400)
          .json({ error: "Invalid input data. All fields are required." });
        return;
      }

      const firstHotelAccessibilityLabel =
        this.searchHotelsService.getFirstHotel(
          parseInt(body.destId),
          body.search_type,
          body.arrival_date,
          body.departure_date
        );

      if (!firstHotelAccessibilityLabel) {
        res
          .status(404)
          .json({ message: "There are no hotel accessibility label found" });
        return;
      }

      res
        .status(201)
        .json({ firstHotelAccessibilityLabel: firstHotelAccessibilityLabel });
    } catch (error) {
      console.log(error);
      res.status(501).json({
        error: "Internal server error in searching hotel accessibility label",
      });
    }
  }
}
