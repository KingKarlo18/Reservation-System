import { IsNotEmpty, IsString, Min, Max } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Accommodation } from "./accommodation";
import { User } from "./user";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Min(1, { message: "Rating must be at least 1" })
  @Max(5, { message: "Rating must be at most 5" })
  @Column()
  rating!: number;

  @IsNotEmpty({ message: "Comment must not be empty" })
  @IsString({ message: "Comment must be a string" })
  @Column()
  comment!: string;

  @ManyToOne(() => User, (user) => user.reviews)
  user!: User;

  @ManyToOne(
    () => Accommodation,
    (accommodation) => accommodation.reviewRatings
  )
  accommodation!: Accommodation;
}
