import express, { Request, Response } from "express";
import { SearchHotelsService } from "../services/SearchHotelsService";
import { SearchHotelsController } from "../controllers/SearchHotelsController";

const searchHotelRouter = express.Router();
const searchHotelsService = new SearchHotelsService();
const searchHotelsController = new SearchHotelsController(searchHotelsService);

searchHotelRouter.use(express.json);

searchHotelRouter.get("/searchHotels", async (req: Request, res: Response) => {
  await searchHotelsController.searchHotels(req, res);
});

searchHotelRouter.get("/searchHotels/firstHotel"),
  async (req: Request, res: Response) => {
    await searchHotelsController.getFirstHotelId(req, res);
    await searchHotelsController.getFirstHotel(req, res);
  };

searchHotelRouter.get("/searchHotels/firstHotel/accesibilityLabel"),
  async (req: Request, res: Response) => {
    await searchHotelsController.getFirstHotelAccesibilityLabel(req, res);
  };

export default searchHotelRouter;
