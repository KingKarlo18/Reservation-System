import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reservation } from "./reservation";
import { Review } from "./review";
import { User } from "./user";
import { IsNotEmpty, Min } from "class-validator";

@Entity()
export class Accommodation {
  @PrimaryColumn()
  id!: number;

  @Column()
  @IsNotEmpty({ message: "Name must not be empty" })
  name!: string;

  @Column()
  @IsNotEmpty({ message: "Address must not be empty" })
  address!: string;

  @Column()
  @IsNotEmpty({ message: "City must not be empty" })
  city!: string;

  @Column()
  @IsNotEmpty({ message: "Country translation must not be empty" })
  countryTrans!: string;

  @Column()
  @Min(0, { message: "Gross amount must be at least 0" })
  grossAmount!: number;

  @Column()
  @Min(0, { message: "Discounted amount must be at least 0" })
  discountedAmount!: number;

  @Column()
  @Min(0, { message: "Charges details amount must be at least 0" })
  chargesDetailsAmount!: number;

  @Column()
  @Min(0, { message: "Strikethrough amount must be at least 0" })
  strikethroughAmount!: number;

  @Column({ nullable: true })
  reviewScore?: number;

  @Column({ nullable: true })
  reviews?: string;

  @OneToMany(() => Reservation, (reservation) => reservation.accommodation)
  reservations?: Reservation[];

  @OneToMany(() => Review, (review) => review.accommodation)
  reviewRatings?: Review[];

  @ManyToMany(() => User, (user) => user.reservedAccommodations)
  reservedByUsers?: User[];
}
