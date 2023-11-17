"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const GetDestinationService_1 = require("./services/GetDestinationService");
const SearchHotelsService_1 = require("./services/SearchHotelsService");
const HotelDetailsService_1 = require("./services/HotelDetailsService");
async function main() {
    // await initializeDataSource();
    const destinationService = new GetDestinationService_1.GetDestinationService();
    const searchHotelsService = new SearchHotelsService_1.SearchHotelsService(destinationService);
    const hotelDetailsService = new HotelDetailsService_1.HotelDetailsService(searchHotelsService);
    const destinationAPI = await destinationService.getFirstDestinationIDAndType("MADRID");
    console.log("Get Destination API");
    console.log(destinationAPI);
    const searchHotelsAPI = await searchHotelsService.getFirstHotelID(destinationAPI[0], destinationAPI[1], "2023-11-18", "2023-12-12");
    // console.log(JSON.stringify(searchHotelsAPI.data.hotels.slice(0, 1), null, 2));
    console.log("\nSearch Hotels API");
    console.log(searchHotelsAPI);
    console.log("\nHotel Details API");
    const hotelDetailsAPI = await hotelDetailsService.getHotelDetails(searchHotelsAPI, "2023-11-18", "2023-12-12");
    console.log(hotelDetailsAPI);
    return destinationAPI;
}
main().catch(console.error);
