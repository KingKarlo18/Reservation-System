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

  async getHotelMainDetails(
    hotelId: number,
    arrivalDate: string,
    departureDate: string
  ) {
    const hotelDetails = await this.getHotelDetails(
      hotelId,
      arrivalDate,
      departureDate
    );

    const hotelName = hotelDetails.data.hotel_name || "";
    const hotelAddress = hotelDetails.data.address || "";
    const hotelCity = hotelDetails.data.city || "";
    const hotelCountryTrans = hotelDetails.data.country_trans || "";
    const hotelGrossAmount =
      hotelDetails.data.product_price_breakdown.gross_amount?.value || "";
    const hotelDiscountedAmount =
      hotelDetails.data.product_price_breakdown.discounted_amount?.value || "";
    const hotelChargesDetailsAmount =
      hotelDetails.data.product_price_breakdown.charges_details.amount?.value ||
      "";
    const hotelChargesDetailsText =
      hotelDetails.data.product_price_breakdown.charges_details
        ?.translated_copy || "";
    const hotelStrikethroughAmount =
      hotelDetails.data.product_price_breakdown.strikethrough_amount?.value ||
      "";

    const hotelBenefits =
      hotelDetails.data.product_price_breakdown?.benefits || "";

    const hotelBenefitDetails = hotelBenefits.map(
      (benefit: { details: any }) => benefit.details
    );

    const roomsAPI = hotelDetails.data.rooms;
    const roomIDs = Object.keys(roomsAPI);
    const firstRoomID = roomIDs[0];
    const roomDetails = roomsAPI[firstRoomID]?.description || "";

    const calculateDays = this.calculateNights(departureDate, arrivalDate);
    const stayDuration = calculateDays !== null ? calculateDays - 1 : null;
    return {
      stayDuration,
      hotelName,
      hotelAddress,
      hotelCity,
      hotelCountryTrans,
      hotelGrossAmount,
      hotelDiscountedAmount,
      hotelChargesDetailsAmount,
      hotelChargesDetailsText,
      hotelStrikethroughAmount,
      hotelBenefitDetails,
      firstRoomID,
      roomDetails,
    };
  }

  calculateNights(departureDate: string, arrivalDate: string): number | null {
    const departure = new Date(departureDate);
    const arrival = new Date(arrivalDate);

    if (isNaN(departure.getTime()) || isNaN(arrival.getTime())) {
      return null;
    }

    const timeDifference = departure.getTime() - arrival.getTime();

    const nights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return nights;
  }
}
