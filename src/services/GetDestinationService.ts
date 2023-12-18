import axios from "axios";
import { config } from "dotenv";

config();

const { SECRET_KEY } = process.env;

export class GetDestinationService {
  constructor() {}

  async getAllDestinationAPI(userInputForDestination: string) {
    const options = {
      method: "GET",
      url: "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination",
      params: userInputForDestination,
      headers: {
        "X-RapidAPI-Key": SECRET_KEY,
        "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);

    return response.data;
  }

  async getAPILength(userInputForDestination: string) {
    const destinationAPILength = await this.getAllDestinationAPI(
      userInputForDestination
    );
    return destinationAPILength.length;
  }

  async getFirstDestinationAPI(userInputForDestination: string) {
    const firstDestinationAPI = await this.getAllDestinationAPI(
      userInputForDestination
    );
    return firstDestinationAPI.data[0];
  }

  async getFirstDestinationID(userInputForDestination: string) {
    const firstDestinationID = await this.getAllDestinationAPI(
      userInputForDestination
    );
    return firstDestinationID.data[0].dest_id;
  }

  async getFirstDestinationIDAndType(userInputForDestination: string) {
    const firstDestinationIDAndType = await this.getAllDestinationAPI(
      userInputForDestination
    );

    const destinationID = firstDestinationIDAndType.data[0].dest_id;
    const destinationSearchType = firstDestinationIDAndType.data[0].search_type;

    return {
      destinationID,
      destinationSearchType,
    };
  }
}
