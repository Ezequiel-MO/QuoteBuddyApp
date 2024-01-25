import { useState, useEffect, FC } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	AddToProjectButton,
	AddToIteneraryButton,
	ButtonDeleteWithAuth
} from '../../../components/atoms'
import {
	formatMoney,
	formatYearMonthDate,
	getTailwindClassesForDate
} from '../../../helper'
import { ModalAddEvent } from '../../projects/add/toSchedule/addModalEvent/ModalAddEvent'
import { TransfersProvider } from '../../projects/add/toProject/transfers/render/context'
import { IRestaurant } from '../../../interfaces'
import { listStyles } from 'src/constants/listStyles'

interface RestaurantListItemProps {
	restaurant: IRestaurant
	canBeAddedToProject: boolean
	restaurants: IRestaurant[]
	setRestaurants: React.Dispatch<React.SetStateAction<IRestaurant[]>>
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
				<tbody className={listStyles.tbody}>
					<tr className={listStyles.tr}>
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
						<td className={`${priceStyle} ${listStyles.td}`}>
							{formatYearMonthDate(restaurant.updatedAt as string)}
						</td>
						<td className={`${priceStyle} ${listStyles.td}`}>
							{formatMoney(restaurant?.price ? restaurant?.price : 0)}
						</td>

						<td>{restaurant.isVenue ? 'TRUE' : 'FALSE'}</td>
						<td className="cursor-pointer">
							<ButtonDeleteWithAuth
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
						<AddToIteneraryButton eventOrRestaurant={restaurant} />
					</tr>
				</tbody>
			</TransfersProvider>
		</>
	)
}

// export default RestaurantListItem
