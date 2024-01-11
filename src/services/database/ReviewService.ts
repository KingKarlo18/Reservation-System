import { Repository } from "typeorm/repository/Repository";
import { Review } from "../../entities/review";
import { Reservation } from "../../entities/reservation";
import { User } from "../../entities/user";
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

  async getAllReviewsForAccommodation(accommodationId: number) {
    const accommodation = await this.accommodationRepo.findOne({
      where: {
        id: accommodationId,
      },
    });

    if (!accommodation) {
      throw new Error(
        `Accommodation with ID ${accommodationId} does not exist}`
      );
    }

    const reviews = await this.reviewRepo.find({
      where: {
        accommodation: accommodation,
      },
    });

    if (!reviews) {
      console.log(
        `There are no reviews for accommodation with id: ${accommodationId}`
      );
    }

    return reviews;
  }

  async getAllUserReviews(userId: number) {
    const user = await this.userRepo.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error(`User with ID ${userId} does not exist}`);
    }

    const reviews = await this.reviewRepo.find({
      where: {
        user: user,
      },
    });

    if (!reviews) {
      console.log(`There are no reviews for user with id: ${userId}`);
    }

    return reviews;
  }
}
