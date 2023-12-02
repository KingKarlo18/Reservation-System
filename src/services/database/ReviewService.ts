import { Repository } from "typeorm/repository/Repository";
import { Review } from "../../entities/review";
import { Reservation } from "../../entities/reservation";
import { User } from "../../entities/user";
import { AccommodationService } from "./AccommodationService";
import { UserService } from "./UserService";
import { Accommodation } from "../../entities/accommodation";
import { ReservationService } from "./ReservationService";

export class ReviewService {
  constructor(
    private readonly reviewRepo: Repository<Review>,
    private readonly userRepo: Repository<User>,
    private readonly accommodationRepo: Repository<Accommodation>,
    private readonly reservationRepo: Repository<Reservation>
  ) {}

  userService = new UserService(this.userRepo);
  reservationService = new ReservationService(
    this.reservationRepo,
    this.userRepo,
    this.accommodationRepo
  );

  async createReview(
    userId: number,
    accommodationId: number,
    rating: number,
    comment: string
  ) {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const reservation = await this.reservationService.findReservation(
      userId,
      accommodationId
    );

    if (!reservation) {
      throw new Error(
        `User with ID ${userId} does not have a reservation for accommodation with ID ${accommodationId}`
      );
    }

    const review = this.reviewRepo.create({
      rating: rating,
      comment: comment,
      user: user,
      accommodation: reservation.accommodation,
    });

    await this.reviewRepo.save(review);

    return review;
  }
}
