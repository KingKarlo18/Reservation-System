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

@Entity()
export class Accommodation {
  @PrimaryColumn()
  id!: number;
  @Column()
  name!: string;
  @Column()
  address!: string;
  @Column()
  city!: string;
  @Column()
  countryTrans!: string;
  @Column()
  grossAmount!: number;
  @Column()
  discountedAmount!: number;
  @Column()
  chargesDetailsAmount!: number;
  @Column()
  strikethroughAmount!: number;
  @Column({ nullable: true })
  reviewScore?: number; // Ocjena smještaja

  @Column({ nullable: true })
  reviews?: string; // Komentari i recenzije smještaja

  @OneToMany(() => Reservation, (reservation) => reservation.accommodation)
  reservations?: Reservation[]; // Veza s rezervacijama

  @OneToMany(() => Review, (review) => review.accommodation)
  reviewRatings?: Review[]; // Veza s recenzijama

  @ManyToMany(() => User, (user) => user.reservedAccommodations)
  reservedByUsers?: User[]; // Korisnici koji su rezervirali smještaj
}
