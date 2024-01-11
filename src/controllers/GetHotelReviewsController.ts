import { Request, Response } from "express";
import { HotelReviewsService } from "../services/GetHotelReviewsService";

export class HotelReviewsController {
  constructor(private readonly getHotelReviewsService: HotelReviewsService) {}

  async getHotelReviewScore(req: Request, res: Response) {
    try {
      const body = req.body;

      if (!body.hotelId) {
        res.status(400).json({ message: "Invalid hotel_id data input" });
        return;
      }

      const hotelReviewsAll =
        await this.getHotelReviewsService.getHotelReviewScore(
          parseInt(body.hotelId)
        );

      if (!hotelReviewsAll) {
        res
          .status(404)
          .json({ message: "Reviews for this hotel are not found" });
        return;
      }

      res.status(201).json({ AllHotelReviews: hotelReviewsAll });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server error in getting hotel review score" });
      return;
    }
  }

  async getHotelReviewsText(req: Request, res: Response) {
    try {
      const body = req.body;

      if (!body.hotelId) {
        res.status(400).json({ message: "Invalid hotelId data input" });
        return;
      }

      const hotelReviewsText =
        await this.getHotelReviewsService.getHotelReviewsText(
          parseInt(body.hotelId)
        );

      if (!hotelReviewsText) {
        res
          .status(404)
          .json({ message: "Reviews text for this hotel are not found" });
        return;
      }

      res.status(201).json({ HotelReviewsText: hotelReviewsText });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server error in getting hotel review text" });
      return;
    }
  }

  async getHotelScores(req: Request, res: Response) {
    try {
      const body = req.body;

      if (!body.hotelId) {
        res.status(400).json({ message: "Invalid hotelId data input in body" });
        return;
      }

      const hotelScores = await this.getHotelReviewsService.getHotelScores(
        parseInt(body.hotelId)
      );

      if (!hotelScores) {
        res
          .status(404)
          .json({ message: "Hotel scores for this hotel are not found" });
        return;
      }

      res.status(201).json({ HotelScores: hotelScores });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server error in getting hotel scores" });
      return;
    }
  }

  async getHotelScoresWithParams(req: Request, res: Response) {
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

      const hotelScores = await this.getHotelReviewsService.getHotelScores(
        hotelId
      );

      if (!hotelScores) {
        res
          .status(404)
          .json({ message: "Hotel scores for this hotel are not found" });
        return;
      }

      res.status(201).json({ HotelScores: hotelScores });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server error in getting hotel scores" });
      return;
    }
  }

  async getHotelReviewsWithParams(req: Request, res: Response) {
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

      const hotelReviews = await this.getHotelReviewsService.getHotelReviews(
        hotelId
      );

      if (!hotelReviews) {
        res
          .status(404)
          .json({ message: "Reviews for this hotel are not found" });
        return;
      }

      res.status(201).json({ HotelReviews: hotelReviews });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server error in getting hotel reviews" });
      return;
    }
  }
}
