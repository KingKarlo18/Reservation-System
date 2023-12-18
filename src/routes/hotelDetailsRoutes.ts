import express, { Request, Response } from "express";
import { HotelDetailsService } from "../services/HotelDetailsService";
import { HotelDetailsController } from "../controllers/HotelDetailsController";

const hotelDetailsRouter = express.Router();
const hotelDetailsService = new HotelDetailsService();
const hotelDetailsController = new HotelDetailsController(hotelDetailsService);

hotelDetailsRouter.use(express.json);

hotelDetailsRouter.get(
  "/searchHotels/firstHotel",
  async (req: Request, res: Response) => {
    await hotelDetailsController.getHotelMainDetails(req, res);
  }
);

hotelDetailsRouter.get(
  "/searchHotels/firstHotel/hotelDetails",
  async (req: Request, res: Response) => {
    await hotelDetailsController.getHotelDetails(req, res);
  }
);

hotelDetailsRouter.get(
  "/:hotelId/hotelDetails",
  async (req: Request, res: Response) => {
    await hotelDetailsController.getHotelDetailsWithParams(req, res);
  }
);

export default hotelDetailsRouter;
