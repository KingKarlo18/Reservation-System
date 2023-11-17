import "reflect-metadata";
import { initializeDataSource } from "./data-source";
import { GetDestinationService } from "./services/GetDestinationService";
import { SearchHotelsService } from "./services/SearchHotelsService";
import { HotelDetailsService } from "./services/HotelDetailsService";

async function main() {
  // await initializeDataSource();
  const destinationService = new GetDestinationService();
  const searchHotelsService = new SearchHotelsService(destinationService);
  const hotelDetailsService = new HotelDetailsService(searchHotelsService);
  const destinationAPI = await destinationService.getFirstDestinationIDAndType(
    "MADRID"
  );
  console.log("Get Destination API");
  console.log(destinationAPI);
  const searchHotelsAPI = await searchHotelsService.getFirstHotelID(
    destinationAPI[0],
    destinationAPI[1],
    "2023-11-18",
    "2023-12-12"
  );
  // console.log(JSON.stringify(searchHotelsAPI.data.hotels.slice(0, 1), null, 2));
  console.log("\nSearch Hotels API");
  console.log(searchHotelsAPI);
  console.log("\nHotel Details API");
  const hotelDetailsAPI = await hotelDetailsService.getHotelDetails(
    searchHotelsAPI,
    "2023-11-18",
    "2023-12-12"
  );
  console.log(hotelDetailsAPI);
  return destinationAPI;
}

main().catch(console.error);
