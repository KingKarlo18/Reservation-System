import { IsEmail } from "class-validator";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reservation } from "./reservation";
import { Review } from "./review";
import { Accommodation } from "./accommodation";

enum ROLE {
  admin = "admin",
  guest = "guest",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  @IsEmail()
  email!: string;

  @Column()
  role!: ROLE;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations?: Reservation[]; // Veza s rezervacijama

  @OneToMany(() => Review, (review) => review.user)
  reviews?: Review[]; // Veza s recenzijama

  @ManyToMany(() => Accommodation, { cascade: true })
  @JoinTable()
  reservedAccommodations?: Accommodation[]; // Smještaji koje je korisnik rezervirao
}
