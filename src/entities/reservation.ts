import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Accommodation } from "./accommodation";
import { User } from "./user";
import { IsNotEmpty, Matches } from "class-validator";

@Entity()
@Index(["accommodation", "arrivalDate", "departureDate"], { unique: true })
export class Reservation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  accommodationId!: number;

  @Column()
  userId!: number;

  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Arrival date must be in the "yyyy-mm-dd" format',
  })
  @IsNotEmpty({ message: "Arrival date must not be empty" })
  @Column()
  arrivalDate!: string;

  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Departure date must be in the "yyyy-mm-dd" format',
  })
  @IsNotEmpty({ message: "Departure date must not be empty" })
  @Column()
  departureDate!: string;

  @Column({ nullable: true })
  review?: number; // Ocjena korisnika nakon boravka

  @ManyToOne(() => Accommodation, (accommodation) => accommodation.reservations)
  accommodation!: Accommodation;

  @ManyToOne(() => User, (user) => user.reservations)
  user!: User;
}
