import express, { Request, Response } from "express";
import { User } from "../entities/user";
import AppDataSource from "../data-source";
import { ReviewService } from "../services/database/ReviewService";
import { Reservation } from "../entities/reservation";
import { Accommodation } from "../entities/accommodation";
import { ReviewController } from "../controllers/ReviewController";
import { Review } from "../entities/review";
import { authenticateToken } from "../plugins/jwt";

const reviewRouter = express.Router();

const reviewService = new ReviewService(
  AppDataSource.getRepository(Review),
  AppDataSource.getRepository(User),
  AppDataSource.getRepository(Accommodation),
  AppDataSource.getRepository(Reservation)
);

const reviewController = new ReviewController(reviewService);

reviewRouter.use(express.json());

reviewRouter.post(
  "/accommodation/create",
  authenticateToken,
  async (req: Request, res: Response) => {
    await reviewController.createReview(req, res);
  }
);

reviewRouter.get(
  "/:accommodationId/reviews",
  async (req: Request, res: Response) => {
    await reviewController.getAllReviewsForAccommodation(req, res);
  }
);

reviewRouter.get("/user/:id/reviews", async (req: Request, res: Response) => {
  await reviewController.getAllUserReviews(req, res);
});

export default reviewRouter;
