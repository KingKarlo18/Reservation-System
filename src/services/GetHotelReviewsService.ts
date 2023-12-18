import axios from "axios";
import { config } from "dotenv";

config();

const { SECRET_KEY } = process.env;

export class HotelReviewsService {
  constructor() {}

  async getHotelReviewScore(hotelId: number) {
    const options = {
      method: "GET",
      url: "https://booking-com15.p.rapidapi.com/api/v1/hotels/getHotelReviewScores",
      params: {
        hotel_id: hotelId,
        languagecode: "en-us",
      },
      headers: {
        "X-RapidAPI-Key": SECRET_KEY,
        "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    return response.data;
  }

  async getHotelReviewsText(hotelId: number) {
    const options = {
      method: "GET",
      url: "https://booking-com15.p.rapidapi.com/api/v1/hotels/getHotelReviews",
      params: {
        hotel_id: hotelId,
        sort_option_id: "sort_most_relevant",
        page_number: "1",
        languagecode: "en-us",
      },
      headers: {
        "X-RapidAPI-Key": SECRET_KEY,
        "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    return response.data;
  }

  async getHotelScores(hotelId: number) {
    const hotelReviews = await this.getHotelReviewScore(hotelId);
    const hotelScoreBreakdown = hotelReviews.data[0].score_breakdown;
    const hotelScorePercentage = hotelReviews.data[0].score_percentage;

    const hotelAverageScore = hotelScoreBreakdown.find(
      (obj: { customer_type: string }) => obj.customer_type === "total"
    );

    const hotelWonderfulScore = hotelScorePercentage.find(
      (obj: { score_word: string }) => obj.score_word === "Wonderful"
    );

    const hotelGoodScore = hotelScorePercentage.find(
      (obj: { score_word: string }) => obj.score_word === "Good"
    );

    const hotelOkayScore = hotelScorePercentage.find(
      (obj: { score_word: string }) => obj.score_word === "Okay"
    );

    const hotelPoorScore = hotelScorePercentage.find(
      (obj: { score_word: string }) => obj.score_word === "Poor"
    );

    const hotelVeryPoorScore = hotelScorePercentage.find(
      (obj: { score_word: string }) => obj.score_word === "Very Poor"
    );

    const numberOfReviews = hotelAverageScore.count;
    const averageScore = hotelAverageScore.average_score;

    const scoreMap = {
      Wonderful: hotelWonderfulScore.count,
      Good: hotelGoodScore.count,
      Okay: hotelOkayScore.count,
      Poor: hotelPoorScore.count,
      VeryPoor: hotelVeryPoorScore.count,
    };

    return {
      numberOfReviews,
      averageScore,
      ...scoreMap,
    };
  }

  async getHotelReviews(hotelId: number) {
    const hotelDetails = await this.getHotelReviewsText(hotelId);
    const firstThreeReviews = hotelDetails.data.result.slice(0, 3);

    let extractedData: {
      title: any;
      pros: any;
      cons: any;
      average_score: any;
    }[] = [];
    firstThreeReviews.forEach(
      (review: { title: any; pros: any; cons: any; average_score: any }) => {
        const { title, pros, cons, average_score } = review;
        extractedData.push({ title, pros, cons, average_score });
      }
    );

    return extractedData;
  }
}
