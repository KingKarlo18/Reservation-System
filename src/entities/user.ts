import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
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

  @IsNotEmpty({ message: "First name must not be empty" })
  @IsString()
  @Column()
  firstName!: string;

  @IsNotEmpty({ message: "Last name must not be empty" })
  @IsString()
  @Column()
  lastName!: string;

  @IsEmail({}, { message: "Invalid email format" })
  @Column()
  email!: string;

  @IsEnum(ROLE, { message: "Invalid role" })
  @Column()
  role!: ROLE;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations?: Reservation[];

  @OneToMany(() => Review, (review) => review.user)
  reviews?: Review[];

  @ManyToMany(() => Accommodation, { cascade: true })
  @JoinTable()
  reservedAccommodations?: Accommodation[];
}
