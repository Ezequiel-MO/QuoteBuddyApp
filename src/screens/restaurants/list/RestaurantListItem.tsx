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
import { useRestaurant } from '../context/RestaurantsContext'

interface RestaurantListItemProps {
	item: IRestaurant
	canBeAddedToProject: boolean
}

export const RestaurantListItem: FC<RestaurantListItemProps> = ({
	item: restaurant,
	canBeAddedToProject = false
}) => {
	const { state, dispatch } = useRestaurant()
	const navigate = useNavigate()
	const [priceStyle, setPriceStyle] = useState('')
	const [open, setOpen] = useState(false)

	const handleNavigateToRestaurantSpecs = () => {
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: true
		})
		dispatch({
			type: 'SET_RESTAURANT',
			payload: restaurant
		})
		navigate('/app/restaurant/specs')
	}

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
		<TransfersProvider>
			<ModalAddEvent open={open} setOpen={setOpen} event={restaurant} />
			<tbody className={listStyles.tbody}>
				<tr className={listStyles.tr}>
					<td
						onClick={handleNavigateToRestaurantSpecs}
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
							setter={(updatedRestaurants: IRestaurant[]) =>
								dispatch({
									type: 'SET_RESTAURANTS',
									payload: updatedRestaurants
								})
							}
							items={state.restaurants || []}
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
	)
}
