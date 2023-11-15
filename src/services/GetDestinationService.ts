import axios from "axios";

const { SECRET_KEY } = process.env;

export class getDestinationService {
  constructor() {}

  async getDestination(userInputForDestination: string) {
    const options = {
      method: "GET",
      url: "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination",
      params: { query: userInputForDestination },
      headers: {
        "X-RapidAPI-Key": SECRET_KEY,
        "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);

    return response.data;
  }
}
