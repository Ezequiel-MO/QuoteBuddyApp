import { useEffect } from 'react'
import { MultipleChoiceCells, SingleChoiceCells } from '../../multipleOrSingle'
import { IEvent, IRestaurant } from '../../../../../interfaces'
import { useContextBudget } from '../../../context/BudgetContext'
import { UPDATE_PROGRAM_ACTIVITIES_COST } from '../../../context/budgetReducer'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'

interface MorningEventsRowProps {
	items: IEvent[]
	date: string
	pax: number
	selectedEvent: IEvent
	setSelectedEvent: React.Dispatch<React.SetStateAction<IEvent | IRestaurant>>
}

export const MorningEventsRow = ({
	items,
	date,
	pax,
	selectedEvent,
	setSelectedEvent
}: MorningEventsRowProps) => {
	const { dispatch } = useContextBudget()
	const NoEvents = items.length === 0

	useEffect(() => {
		dispatch({
			type: UPDATE_PROGRAM_ACTIVITIES_COST,
			payload: {
				date,
				activity: selectedEvent ? selectedEvent : null,
				pax,
				type: 'morning'
			}
		})
	}, [dispatch, date, selectedEvent])

	if (NoEvents) return null

	const multipleChoice = items.length > 1

	const props = {
		pax,
		date,
		options: items,
		description: 'Morning Event',
		id: 'morningEvents' as
			| 'morningEvents'
			| 'afternoonEvents'
			| 'lunch'
			| 'dinner'
	}

	return (
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
	)
}
