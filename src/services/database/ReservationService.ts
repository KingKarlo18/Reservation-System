import { LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { Reservation } from "../../entities/reservation";
import { User } from "../../entities/user";
import { Accommodation } from "../../entities/accommodation";
import { AccommodationService } from "./AccommodationService";
import { UserService } from "./UserService";

export class ReservationService {
  constructor(
    private readonly reservationRepo: Repository<Reservation>,
    private readonly userRepo: Repository<User>,
    private readonly accommodationRepo: Repository<Accommodation>
  ) {}

  userService = new UserService(this.userRepo);
  accommodationService = new AccommodationService(this.accommodationRepo);

  async createReservation(
    userId: number,
    accommodationId: number,
    arrivalDate: string,
    departureDate: string
  ) {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const accommodation = await this.accommodationService.findAccommodationById(
      accommodationId
    );
    if (!accommodation) {
      throw new Error(`Accommodation with ID ${accommodationId} not found`);
    }

    this.checkExistingReservation(accommodation, arrivalDate, departureDate);

    if (
      await this.checkExistingReservation(
        accommodation,
        arrivalDate,
        departureDate
      )
    ) {
      throw new Error("Accommodation is already booked for the selected dates");
    }

    const reservation = this.reservationRepo.create({
      user,
      accommodation,
      arrivalDate,
      departureDate,
    });

    await this.reservationRepo.save(reservation);

    return reservation;
  }

  async findReservation(userId: number, accommodationId: number) {
    const reservation = await this.reservationRepo.findOne({
      where: {
        userId: userId,
        accommodationId: accommodationId,
      },
    });

    if (!reservation) {
      throw new Error(
        `User with ID ${userId} does not have a reservation for accommodation with ID ${accommodationId}`
      );
    }

    return reservation;
  }

  async getUserReservations(userId: number) {
    const user = await this.userRepo.findOne({
      where: {
        id: userId,
      },
      relations: ["reservations"],
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    return user.reservations;
  }

  async checkExistingReservation(
    accommodation: Accommodation,
    arrivalDate: string,
    departureDate: string
  ) {
    const existingReservation = await this.reservationRepo.findOne({
      where: {
        accommodation: accommodation,
        departureDate: MoreThanOrEqual(arrivalDate),
        arrivalDate: LessThanOrEqual(departureDate),
      },
    });

    if (existingReservation != null) {
      return true;
    } else {
      return false;
    }
  }
}
