import express, { Request, Response } from "express";
import AppDataSource from "../data-source";
import { AccommodationService } from "../services/database/AccommodationService";
import { AccommodationController } from "../controllers/AccommodationController";
import { Accommodation } from "../entities/accommodation";
import { authenticateToken } from "../plugins/jwt";

const accommodationRouter = express.Router();
const accommodationService = new AccommodationService(
  AppDataSource.getRepository(Accommodation)
);
const accomodationController = new AccommodationController(
  accommodationService
);

accommodationRouter.use(express.json());

accommodationRouter.post(
  "/accommodation/create",
  authenticateToken,
  async (req: Request, res: Response) => {
    await accomodationController.createAccommodation(req, res);
  }
);

accommodationRouter.put(
  "/accommodation/updateAccommodation/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    await accomodationController.updateAccommodation(req, res);
  }
);

accommodationRouter.get(
  "/accommodation/:name",
  async (req: Request, res: Response) => {
    await accomodationController.findAccommodationByName(req, res);
  }
);

accommodationRouter.get(
  "/accommodation/:city",
  async (req: Request, res: Response) => {
    await accomodationController.findAccommodationByCity(req, res);
  }
);

accommodationRouter.get(
  "/accommodation/:id",
  async (req: Request, res: Response) => {
    await accomodationController.findAccommodationById(req, res);
  }
);

export default accommodationRouter;
