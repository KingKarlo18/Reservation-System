import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Accommodation } from "./accommodation";
import { User } from "./user";

@Entity()
@Index(["accommodation", "arrivalDate", "departureDate"], { unique: true })
export class Reservation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  accommodationId!: number;

  @Column()
  userId!: number;

  @Column()
  arrivalDate!: string;

  @Column()
  departureDate!: string;

  @Column({ nullable: true })
  review?: number; // Ocjena korisnika nakon boravka

  @ManyToOne(() => Accommodation, (accommodation) => accommodation.reservations)
  accommodation!: Accommodation;

  @ManyToOne(() => User, (user) => user.reservations)
  user!: User;
}
