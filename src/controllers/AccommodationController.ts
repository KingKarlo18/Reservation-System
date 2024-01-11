import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { Accommodation } from "../entities/accommodation";
import { AccommodationService } from "../services/database/AccommodationService";

export class AccommodationController {
  constructor(private accommodationService: AccommodationService) {}

  async createAccommodation(req: Request, res: Response) {
    try {
      const accommodation: Accommodation = plainToClass(
        Accommodation,
        req.body
      );
      const errors = await validate(accommodation);

      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      await this.accommodationService.createAccommodation(accommodation);

      res.status(201).json({ message: "Accomodation created successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Internal Server Error With Creating Accommodation" });
    }
  }

  async findAccommodationByName(req: Request, res: Response) {
    try {
      const accommodationNameParam = req.params.name;
      const accommodationNameBody = req.body.name;

      if (
        !accommodationNameParam &&
        !accommodationNameBody &&
        accommodationNameParam !== accommodationNameBody
      ) {
        res.status(400).json({
          error: "Mismatch between params and body for accommodation name",
        });
        return;
      }

      const accomodationName = accommodationNameBody;

      const foundAccommodation =
        await this.accommodationService.findAccommodationByName(
          accomodationName
        );

      if (!foundAccommodation) {
        res.status(404).json({ message: "Accommodation by name not found" });
        return;
      }

      res.status(201).json({
        user: foundAccommodation,
        message: "Accommodation found successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Internal Server Error With Finding Accommodation By Name",
      });
    }
  }

  async findAccommodationByCity(req: Request, res: Response) {
    try {
      const accommodationCityParam = req.params.city;
      const accommodationCityBody = req.body.city;

      if (
        !accommodationCityParam &&
        !accommodationCityBody &&
        accommodationCityParam !== accommodationCityBody
      ) {
        res.status(400).json({
          error: "Mismatch between params and body for accommodation city",
        });
        return;
      }

      const accomodationCity = accommodationCityBody;

      const foundAccommodation =
        await this.accommodationService.findAccommodationByCity(
          accomodationCity
        );

      if (!foundAccommodation) {
        res.status(404).json({ message: "Accommodation by city not found" });
        return;
      }

      res.status(201).json({
        user: foundAccommodation,
        message: "Accommodation found successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Internal Server Error With Finding Accommodation By City",
      });
    }
  }

  async findAccommodationById(req: Request, res: Response) {
    try {
      const accommodationIdParam = parseInt(req.params.id);
      const accommodationIdBody = parseInt(req.body.id);

      if (
        !accommodationIdParam &&
        !accommodationIdBody &&
        accommodationIdParam !== accommodationIdBody
      ) {
        res.status(400).json({
          error: "Mismatch between params and body for accommodation id",
        });
        return;
      }

      const accommodationId = accommodationIdBody;

      const foundAccommodation =
        await this.accommodationService.findAccommodationById(accommodationId);

      if (!foundAccommodation) {
        res.status(404).json({ message: "Accommodation by id not found" });
        return;
      }

      res.status(201).json({
        user: foundAccommodation,
        message: "Accommodation found successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Internal Server Error With Finding Accommodation By Id",
      });
    }
  }

  async updateAccommodation(req: Request, res: Response) {
    try {
      const body = req.body as any;

      const paramId: number = parseInt(req.params.id);

      const oldAccommodation: Accommodation = plainToClass(
        Accommodation,
        body.oldUser
      );
      const newAccommodationData: Accommodation = plainToClass(
        Accommodation,
        body.newUserData
      );

      const errorsOldUser = await validate(oldAccommodation);
      const errorsNewUserData = await validate(newAccommodationData);

      if (errorsOldUser.length > 0 || errorsNewUserData.length > 0) {
        res.status(400).json({
          errorsOldUser: errorsOldUser,
          errorsNewUserData: errorsNewUserData,
        });
        return;
      }

      if (body.id && body.id !== paramId) {
        res.status(400).json({ error: "ID mismatch between body and params" });
        return;
      }

      const updatedAccommodation =
        await this.accommodationService.updateAccommodation(
          oldAccommodation,
          newAccommodationData
        );

      res.status(200).json({
        user: updatedAccommodation,
        message: "User updated successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
