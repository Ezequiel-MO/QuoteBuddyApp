export const RestaurantVenueFilter = ({
  setVenueOrRestaurant,
  venueOrRestaurant
}) => (
  <div className='w-60 max-w-sm my-2 ml-0 mr-0'>
    <form>
      <div className='flex items-center gap-2'>
        <select
          id='restaurants_venues'
          className='flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer'
          onChange={(e) => setVenueOrRestaurant(e.target.value)}
          value={venueOrRestaurant}
        >
          <option value='all'>--- Restaurant or Venue ---</option>
          <option value='restaurants'>Only Restaurants</option>
          <option value='venues'>Only Venues</option>
        </select>
      </div>
    </form>
  </div>
)
