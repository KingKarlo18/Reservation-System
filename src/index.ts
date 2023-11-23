import "reflect-metadata";
import { initializeDataSource } from "./data-source";
import { GetDestinationService } from "./services/GetDestinationService";
import { SearchHotelsService } from "./services/SearchHotelsService";
import { HotelDetailsService } from "./services/HotelDetailsService";
import { HotelRewievsService } from "./services/GetHotelReviews";

async function main() {
  // await initializeDataSource();
  const destinationService = new GetDestinationService();
  const searchHotelsService = new SearchHotelsService(destinationService);
  const hotelDetailsService = new HotelDetailsService(searchHotelsService);
  const hotelReviewsService = new HotelRewievsService(searchHotelsService);
  const destinationAPI = await destinationService.getFirstDestinationIDAndType(
    "MADRID"
  );
  console.log("Get Destination API");
  console.log(destinationAPI);
  const searchHotelsAPI = await searchHotelsService.getFirstHotelID(
    destinationAPI.destinationID,
    destinationAPI.destinationSearchType,
    "2023-12-22",
    "2023-12-30"
  );
  console.log("\nSearch Hotels API");
  // console.log(JSON.stringify(searchHotelsAPI.data.hotels.slice(0, 1), null, 2));
  console.log(searchHotelsAPI);
  console.log("\nHotel Details API");
  const hotelDetailsAPI = await hotelDetailsService.getHotelMainDetails(
    searchHotelsAPI,
    "2023-12-22",
    "2023-12-30"
  );
  console.log(hotelDetailsAPI);

  console.log("\nHotel Reviews API");
  const hotelReviewsAPI = await hotelReviewsService.getHotelReviews(
    searchHotelsAPI
  );

  console.log(hotelReviewsAPI);

  console.log("\nHotel Score API");
  const hotelScoreAPI = await hotelReviewsService.getHotelScores(
    searchHotelsAPI
  );
  console.log(hotelScoreAPI);

  return destinationAPI;
}

main().catch(console.error);
