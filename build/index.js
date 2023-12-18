"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.app = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use("/", indexRoutes_1.default);
const PORT = process.env.PORT || 3000;
exports.PORT = PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
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
