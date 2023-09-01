import { useState, useEffect, FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { ButtonDeleted, AddToProjectButton } from '../../../components/atoms'
import {
	formatMoney,
	formatYearMonthDate,
	getTailwindClassesForDate
} from '../../../helper'
import { ModalAddEvent } from '../../projects/add/toSchedule/addModalEvent/ModalAddEvent'
import { TransfersProvider } from '../../projects/add/toProject/transfers/render/context'
import { IRestaurant } from '../../../interfaces'

interface RestaurantListItemProps {
	restaurant: IRestaurant
	canBeAddedToProject: boolean
	restaurants: IRestaurant[]
	setRestaurants: (restaurants: IRestaurant[]) => void
}

export const RestaurantListItem: FC<RestaurantListItemProps> = ({
	restaurant,
	canBeAddedToProject,
	restaurants,
	setRestaurants
}) => {
	const navigate = useNavigate()
	const [priceStyle, setPriceStyle] = useState('')
	const [open, setOpen] = useState(false)

	useEffect(() => {
		let priceDueStatus = getTailwindClassesForDate(
			restaurant.updatedAt as string
		)
		priceDueStatus === 'overdue'
			? setPriceStyle('text-red-500')
			: priceDueStatus === 'due-soon'
			? setPriceStyle('text-yellow-500')
			: setPriceStyle('text-green-500')
	}, [restaurant])

	return (
		<>
			<TransfersProvider>
				<ModalAddEvent open={open} setOpen={setOpen} event={restaurant} />
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
						<td className={priceStyle}>
							{formatYearMonthDate(restaurant.updatedAt as string)}
						</td>
						<td className={priceStyle}>{formatMoney(restaurant.price)}</td>

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
							onAdd={() => setOpen(true)}
						/>
					</tr>
				</tbody>
			</TransfersProvider>
		</>
	)
}

// export default RestaurantListItem
