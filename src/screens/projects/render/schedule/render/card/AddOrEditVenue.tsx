import { FC } from 'react'
import { IRestaurant } from '../../../../../../interfaces'
import { Button } from '../../../../../../components/atoms'
import { ModalVenue } from './modalVenueRestaurant/ModalVenue'

interface AddOrEditVenueProps {
	typeEvent: 'lunch' | 'dinner'
	isDragging: boolean
	restaurant: IRestaurant
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	dayIndex: number
	setChange: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddOrEditVenue: FC<AddOrEditVenueProps> = ({
	typeEvent,
	restaurant,
	isDragging,
	open,
	setOpen,
	dayIndex,
	setChange
}) => {
	const classVenue =
		'text-sm inline-block text-orange-400 hover:text-orange-500 transition-colors duration-150 font-medium'

	const isRestaurant = ['lunch', 'dinner']
	const isVenue = Object.values(restaurant?.venue_price || {}).length > 0
	if (!isRestaurant.includes(typeEvent) || isDragging || !restaurant?.isVenue)
		return null

	return (
		<>
			<ModalVenue
				open={open}
				setOpen={setOpen}
				restaurant={restaurant}
				typeMeal={typeEvent}
				dayIndex={dayIndex}
				setChange={setChange}
			/>
			<Button
				type="button"
				newClass={classVenue}
				icon=""
				handleClick={() => setOpen(true)}
			>
				<abbr title="Open venue details form" className="cursor-help">
					{!isVenue ? '+ Add Venue' : '✎ Edit Venue'}
				</abbr>
			</Button>
		</>
	)
}
