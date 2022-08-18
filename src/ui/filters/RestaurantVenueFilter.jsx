const RestaurantVenueFilter = ({ setVenueOrRestaurant }) => (
  <div className="flex flex-row justify-between my-1 max-w-[480px] mr-2">
    <label className="text-xl text-gray-100" htmlFor="restaurants_venues">
      Restaurants/Venues
    </label>
    <select
      id="restaurants_venues"
      className="ml-10 flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer"
      onChange={(e) => setVenueOrRestaurant(e.target.value)}
    >
      <option value="all">--- All ---</option>
      <option value="restaurants">Only Restaurants</option>
      <option value="venues">Only Venues</option>
    </select>
  </div>
);

export default RestaurantVenueFilter;
