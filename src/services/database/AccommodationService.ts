import { Repository } from "typeorm";
import { Accommodation } from "../../entities/accommodation";

export class AccommodationService {
  constructor(private readonly accommodationRepo: Repository<Accommodation>) {}

  async createAccommodation(accommodation: Accommodation) {
    const accommodationData = this.accommodationRepo.create({
      name: accommodation.name,
      address: accommodation.address,
      city: accommodation.city,
      countryTrans: accommodation.countryTrans,
      grossAmount: accommodation.grossAmount,
      discountedAmount: accommodation.discountedAmount,
      chargesDetailsAmount: accommodation.chargesDetailsAmount,
      strikethroughAmount: accommodation.strikethroughAmount,
      reviewScore: accommodation.reviewScore,
      reviews: accommodation.reviews,
    });

    await this.accommodationRepo.save(accommodationData);
  }

  async findAccommodationByName(name: string) {
    const accommodationData = await this.accommodationRepo.findOne({
      where: {
        name: name,
      },
    });

    if (!accommodationData) {
      throw new Error("Cannot find accommodation with name: " + name);
    }
    return accommodationData;
  }

  async findAccommodationByCity(cityName: string) {
    const accommodationData = await this.accommodationRepo.find({
      where: {
        city: cityName,
      },
    });

    if (!accommodationData) {
      throw new Error("Cannot find accommodation in city: " + cityName);
    }
    return accommodationData;
  }

  async findAccommodationById(accommodationId: number) {
    const accommodationData = await this.accommodationRepo.findOneBy({
      id: accommodationId,
    });

    if (!accommodationData) {
      throw new Error("Cannot find accommodation with Id: " + accommodationId);
    }

    return accommodationData;
  }

  async updateAccommodation(
    oldAccommodation: Accommodation,
    newAccommodationData: Accommodation
  ) {
    const existingAccommodation = await this.findAccommodationById(
      oldAccommodation.id
    );

    if (!existingAccommodation) {
      throw new Error("Accommodation not found");
    }

    await this.accommodationRepo.update(existingAccommodation.id, {
      name: newAccommodationData.name,
      address: newAccommodationData.address,
      city: newAccommodationData.city,
      countryTrans: newAccommodationData.countryTrans,
      grossAmount: newAccommodationData.grossAmount,
      discountedAmount: newAccommodationData.discountedAmount,
      chargesDetailsAmount: newAccommodationData.chargesDetailsAmount,
      strikethroughAmount: newAccommodationData.strikethroughAmount,
      reviewScore: newAccommodationData.reviewScore,
      reviews: newAccommodationData.reviews,
    });

    const updatedUser = await this.findAccommodationById(
      newAccommodationData.id
    );

    return updatedUser;
  }
}
