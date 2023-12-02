import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Accommodation } from "./accommodation";
import { User } from "./user";


@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  rating!: number;

  @Column()
  comment!: string;

  @ManyToOne(() => User, user => user.reviews)
  user!: User;

  @ManyToOne(() => Accommodation, accommodation => accommodation.reviewRatings)
  accommodation!: Accommodation;
}
