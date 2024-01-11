import { Request, Response } from "express";
import { ReviewService } from "../services/database/ReviewService";

export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  async createReview(req: Request, res: Response) {
    try {
      const { userId, accommodationId, rating, comment } = req.body;

      if (!userId || !accommodationId || !rating || !comment) {
        res.status(400).json({
          message: "Invalid create review data input",
        });
        return;
      }

      const review = await this.reviewService.createReview(
        parseInt(userId),
        parseInt(accommodationId),
        parseInt(rating),
        comment
      );

      res.status(201).json({
        review: review,
        message: "Review created successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal Server Error With Creating Review",
      });
    }
  }

  async getAllReviewsForAccommodation(req: Request, res: Response) {
    try {
      let accommodationId: number;

      if (req.params.accommodationId) {
        accommodationId = parseInt(req.params.id);
      } else {
        res.status(400).json({ message: "ID is required in the params" });
        return;
      }

      const body = req.body;

      if (!body.accommodationId) {
        res.status(400).json({ message: "Invalid hotelId data input in body" });
        return;
      }

      if (
        parseInt(req.params.accommodationId) == parseInt(body.accommodationId)
      ) {
        accommodationId = body.accommodationId;
      } else {
        res.status(400).json({
          message: "ID mismatch between body and params",
        });
        return;
      }

      const accommodationReviews =
        await this.reviewService.getAllReviewsForAccommodation(accommodationId);

      if (!accommodationReviews) {
        res.status(404).json({
          message: "Accommodation reviews for this hotel are not found",
        });
        return;
      }

      res.status(201).json({ AccommodationReviews: accommodationReviews });
    } catch (error) {
      res.status(500).json({
        error: "Internal server error in getting accommodation reviews",
      });
      return;
    }
  }

  async getAllUserReviews(req: Request, res: Response) {
    try {
      let userId: number;

      if (req.params.id) {
        userId = parseInt(req.params.id);
      } else {
        res.status(400).json({ message: "ID is required in the params" });
        return;
      }

      const body = req.body;

      if (!body.userId) {
        res.status(400).json({ message: "Invalid userId data input in body" });
        return;
      }

      if (parseInt(req.params.id) == parseInt(body.userId)) {
        userId = body.id;
      } else {
        res.status(400).json({
          message: "ID mismatch between body and params",
        });
        return;
      }

      const userReviews = await this.reviewService.getAllUserReviews(userId);

      if (!userReviews) {
        res
          .status(404)
          .json({ message: "Reviews from this user are not found" });
        return;
      }

      res.status(201).json({ UserReviews: userReviews });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server error in getting user's reviews" });
      return;
    }
  }
}
