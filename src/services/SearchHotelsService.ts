import axios from "axios";
import { GetDestinationService } from "./GetDestinationService";
import { config } from "dotenv";

config();
const { SECRET_KEY } = process.env;

export class SearchHotelsService {
  constructor() {}

  async searchHotels(
    destId: number,
    searchType: string,
    arrivalDate: string,
    departureDate: string
  ) {
    const options = {
      method: "GET",
      url: "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels",
      params: {
        dest_id: destId,
        search_type: searchType,
        arrival_date: arrivalDate,
        departure_date: departureDate,
        adults: "1",
        children_age: "0",
        room_qty: "1",
        page_number: "1",
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

  async getFirstHotel(
    destId: number,
    searchType: string,
    arrivalDate: string,
    departureDate: string
  ) {
    const hotelAPIs = await this.searchHotels(
      destId,
      searchType,
      arrivalDate,
      departureDate
    );
    const firstHotelAPI = hotelAPIs.data.hotels[0];
    return firstHotelAPI;
  }

  async getFirstHotelID(
    destId: number,
    searchType: string,
    arrivalDate: string,
    departureDate: string
  ) {
    const firstHotelAPI = await this.getFirstHotel(
      destId,
      searchType,
      arrivalDate,
      departureDate
    );

    const firstHotelID = firstHotelAPI.hotel_id;

    return firstHotelID;
  }

  async getFirstHotelAccesibilityLabel(
    destId: number,
    searchType: string,
    arrivalDate: string,
    departureDate: string
  ) {
    const firstHotelAPI = await this.getFirstHotel(
      destId,
      searchType,
      arrivalDate,
      departureDate
    );

    const firstHotelAccessibilityLabel = firstHotelAPI.accessibilityLabel;

    const parts = firstHotelAccessibilityLabel.split(" \n").filter(Boolean);
    return parts;
  }
}
