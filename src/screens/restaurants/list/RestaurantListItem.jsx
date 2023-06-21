import { useNavigate } from 'react-router-dom'
import { ButtonDeleted, AddToProjectButton } from '../../../components/atoms'
import { formatMoney } from '../../../helper'

const RestaurantListItem = ({
	restaurant,
	addRestaurantToProject,
	canBeAddedToProject,
	restaurants,
	setRestaurants
}) => {
	const navigate = useNavigate()

	return (
		<tbody>
			<tr className="mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50">
				<td
					onClick={() =>
						navigate(`/app/restaurant/specs`, {
							state: { restaurant }
						})
					}
					className="hover:text-blue-600 hover:underline cursor-pointer"
				>
					{restaurant.name}
				</td>
				<td>{restaurant.city}</td>
				<td>{formatMoney(restaurant.price)}</td>
				<td>{restaurant.isVenue ? 'TRUE' : 'FALSE'}</td>
				<td className="cursor-pointer">
					<ButtonDeleted
						endpoint={'restaurants'}
						ID={restaurant._id}
						setter={setRestaurants}
						items={restaurants}
					/>
				</td>
				<AddToProjectButton
					canBeAddedToProject={canBeAddedToProject}
					onAdd={() => addRestaurantToProject(restaurant)}
				/>
			</tr>
		</tbody>
	)
}

export default RestaurantListItem
