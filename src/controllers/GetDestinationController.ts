import { Request, Response } from "express";
import { GetDestinationService } from "../services/GetDestinationService";

export class GetDestinationController {
  constructor(private readonly getDestinationService: GetDestinationService) {}

  async getAllDestinationAPI(req: Request, res: Response) {
    try {
      const body = req.body;

      if (!body.userInputForDestination) {
        res.status(400).json({ message: "Invalid destination data input" });
        return;
      }

      const allDestinationAPI = this.getDestinationService.getAllDestinationAPI(
        body.userInputForDestination
      );

      if (!allDestinationAPI) {
        res.status(404).json({ messaage: "Destination is not found" });
        return;
      }

      res.status(201).json({ AllDestinationAPI: allDestinationAPI });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server error in getting hotel daetails" });
      return;
    }
  }

  async getFirstDestinationID(req: Request, res: Response) {
    try {
      const body = req.body;

      if (!body.userInputForDestination) {
        res.status(400).json({ message: "Invalid destination data input" });
        return;
      }

      const firstDestinationID =
        this.getDestinationService.getFirstDestinationID(
          body.userInputForDestination
        );

      if (!firstDestinationID) {
        res.status(404).json({ message: "Destination Id is not found" });
        return;
      }

      res.status(201).json({ FirstDestinationID: firstDestinationID });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server error in getting hotel daetails" });
      return;
    }
  }

  async getFirstDestinationIDAndType(req: Request, res: Response) {
    try {
      const body = req.body;

      if (!body.userInputForDestination) {
        res.status(400).json({ message: "Invalid destination data input" });
        return;
      }

      const firstDestinationIDAndType =
        this.getDestinationService.getFirstDestinationIDAndType(
          body.userInputForDestination
        );

      if (!firstDestinationIDAndType) {
        res
          .status(404)
          .json({ messaage: "Destination Id and Type is not found" });
        return;
      }

      res
        .status(201)
        .json({ FirstDestinationIDAndType: firstDestinationIDAndType });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server error in getting hotel daetails" });
      return;
    }
  }
}
