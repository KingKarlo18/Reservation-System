import express, { Request, Response } from "express";
import { GetDestinationController } from "../controllers/GetDestinationController";
import { GetDestinationService } from "../services/GetDestinationService";

const destinationRouter = express.Router();
const getDestinationService = new GetDestinationService();
const getDestinationController = new GetDestinationController(
  getDestinationService
);

destinationRouter.use(express.json());

destinationRouter.get("/destination", async (req: Request, res: Response) => {
  getDestinationController.getAllDestinationAPI(req, res);
});

destinationRouter.get(
  "/destinationIdAndText",
  async (req: Request, res: Response) => {
    getDestinationController.getFirstDestinationID(req, res);
    getDestinationController.getFirstDestinationIDAndType(req, res);
  }
);

export default destinationRouter;
