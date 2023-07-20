import { filterStyles } from '../../../constants'

export const RestaurantVenueFilter = ({
	setVenueOrRestaurant,
	venueOrRestaurant
}) => (
	<div className={filterStyles['container']}>
		<form>
			<div className={filterStyles['innerContainer']}>
				<select
					id="restaurants_venues"
					className={filterStyles['select']}
					onChange={(e) => setVenueOrRestaurant(e.target.value)}
					value={venueOrRestaurant}
				>
					<option value="all">--- Restaurant or Venue ---</option>
					<option value={false}>Only Restaurants</option>
					<option value={true}>Only Venues</option>
				</select>
			</div>
		</form>
	</div>
)
