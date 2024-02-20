import { MultipleChoiceCells, SingleChoiceCells } from '../../multipleOrSingle'
import { IEvent, IRestaurant } from '../../../../../interfaces'

import { VenueBreakdownRows } from '../venue'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'

interface DinnerRowProps {
	items: IRestaurant[]
	date: string
	pax: number
	selectedEvent: IRestaurant
	setSelectedEvent: React.Dispatch<React.SetStateAction<IEvent | IRestaurant>>
}

export const DinnerRow = ({
	items,
	date,
	pax,
	selectedEvent,
	setSelectedEvent
}: DinnerRowProps) => {
	const NoDinner = items.length === 0

	const handleVenueChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		const selectedVenue = items.find(
			(restaurant) => restaurant.name === e.target.value
		) as IRestaurant
		setSelectedEvent(selectedVenue)
	}

	if (NoDinner) return null
	const multipleChoice = items.length > 1
	const props = {
		pax,
		date,
		options: items,
		description: 'Dinner Restaurants',
		id: 'dinner' as 'dinner'
	}

	return (
		<>
			<tr className={tableRowClasses}>
				<td className={tableCellClasses}>{date}</td>
				{multipleChoice ? (
					<MultipleChoiceCells
						{...props}
						selectedEvent={selectedEvent}
						setSelectedEvent={
							setSelectedEvent as React.Dispatch<
								React.SetStateAction<IEvent | IRestaurant>
							>
						}
					/>
				) : (
					<SingleChoiceCells {...props} />
				)}
			</tr>
			{selectedEvent.isVenue && (
				<VenueBreakdownRows
					date={date}
					id="dinner"
					venue={selectedEvent}
					units={pax}
				/>
			)}
		</>
	)
}
