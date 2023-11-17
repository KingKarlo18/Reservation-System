import axios from "axios";
import { config } from "dotenv";
import { SearchHotelsService } from "./SearchHotelsService";

config();

const { SECRET_KEY } = process.env;

export class HotelDetailsService {
  constructor(private readonly searchHotels: SearchHotelsService) {}

  async getHotelDetails(
    hotelId: number,
    arrivalDate: string,
    departureDate: string
  ) {
    const options = {
      method: "GET",
      url: "https://booking-com15.p.rapidapi.com/api/v1/hotels/getHotelDetails",
      params: {
        hotel_id: hotelId,
        arrival_date: arrivalDate,
        departure_date: departureDate,
        adults: "1",
        children_age: "1,17",
        room_qty: "1",
        languagecode: "en-us",
        currency_code: "EUR",
      },
      headers: {
        "X-RapidAPI-Key": SECRET_KEY,
        "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    return response.data;
  }
}
