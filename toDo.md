# Get all Apis needed form RapidApi

- Get api for place where you want to search for hotel
- Get api for hotels in one area (search hotels)
- Get api for hotel details

# Allow client to input wanted data

Get Destination

- Get query <from User> (City or Country name)

Search Hotels

- Get dest_id <from Get Destination API>, search_type <from Get Destination API>, arrival_date <from User> [yyyy-mm-dd], departure_date <from User> [yyyy-mm-dd]

Get Hotel Details

- Get hotel_id <from SearchHotel API>, arrival_date <from User> [yyyy-mm-dd], departure_date <from User> [yyyy-mm-dd]
