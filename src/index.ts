import "reflect-metadata";
import { GetDestinationService } from "./services/GetDestinationService";
import { SearchHotelsService } from "./services/SearchHotelsService";
import { HotelDetailsService } from "./services/HotelDetailsService";
import { HotelReviewsService } from "./services/GetHotelReviewsService";
import express from "express";
import { config } from "dotenv";
import indexRouter from "./routes/indexRoutes";
import { DataSource } from "typeorm";
import { User } from "./entities/user";

config();

const app = express();

app.use(express.json());

app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { app, PORT };

// async function main() {
//   // await initializeDataSource();
//   const destinationService = new GetDestinationService();
//   const searchHotelsService = new SearchHotelsService();
//   const hotelDetailsService = new HotelDetailsService();
//   const hotelReviewsService = new HotelRewievsService();
//   const destinationAPI = await destinationService.getFirstDestinationIDAndType(
//     "Amsterdam"
//   );
//   console.log("Get Destination API");
//   console.log(destinationAPI);
//   const searchHotelsAPI = await searchHotelsService.getFirstHotelID(
//     destinationAPI.destinationID,
//     destinationAPI.destinationSearchType,
//     "2023-12-22",
//     "2023-12-30"
//   );
//   console.log("\nSearch Hotels API");
//   // console.log(JSON.stringify(searchHotelsAPI.data.hotels.slice(0, 1), null, 2));
//   console.log(searchHotelsAPI);
//   console.log("\nHotel Details API");
//   const hotelDetailsAPI = await hotelDetailsService.getHotelMainDetails(
//     searchHotelsAPI,
//     "2023-12-22",
//     "2023-12-30"
//   );
//   console.log(hotelDetailsAPI);

//   console.log("\nHotel Reviews API");
//   const hotelReviewsAPI = await hotelReviewsService.getHotelReviews(
//     searchHotelsAPI
//   );

//   console.log(hotelReviewsAPI);

//   console.log("\nHotel Score API");
//   const hotelScoreAPI = await hotelReviewsService.getHotelScores(
//     searchHotelsAPI
//   );
//   console.log(hotelScoreAPI);

//   return destinationAPI;
// }

// main().catch(console.error);
