import express, { Request, Response } from "express";
import { HotelReviewsService } from "../services/GetHotelReviewsService";
import { HotelReviewsController } from "../controllers/GetHotelReviewsController";

const hotelReviewRouter = express.Router();
const hotelDetailsService = new HotelReviewsService();
const hotelDetailsController = new HotelReviewsController(hotelDetailsService);

hotelReviewRouter.use(express.json);

hotelReviewRouter.get(
  "/searchHotels/firstHotel",
  async (req: Request, res: Response) => {
    await hotelDetailsController.getHotelScores(req, res);
  }
);

hotelReviewRouter.get(
  "/:hotelId/hotelReviews",
  async (req: Request, res: Response) => {
    await hotelDetailsController.getHotelScoresWithParams(req, res);
    await hotelDetailsController.getHotelReviewsWithParams(req, res);
  }
);

export default hotelReviewRouter;
