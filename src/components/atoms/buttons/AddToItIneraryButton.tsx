import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toastOptions, errorToastOptions } from 'src/helper/toast'
import { useCurrentProject } from 'src/hooks/redux/useCurrentProject'
import { IEvent, IRestaurant } from 'src/interfaces'
import { Button } from './Button'

/**
 * Interface defining the structure of an itinerary entry
 */
interface IAddItinerary {
	name: string
	route: string
	dayIndex: number
	typeOfEvent:
		| 'morningActivity'
		| 'afternoonActivity'
		| 'nightActivity'
		| 'lunch'
		| 'dinner'
}

/**
 * Component props for the AddToIteneraryButton
 */
interface AddToItineraryButtonProps {
	eventOrRestaurant: IEvent | IRestaurant
}

/**
 * Button component that adds an event or restaurant to the current itinerary
 * Displays only when 'addItinerary' is present in localStorage
 */
export const AddToItineraryButton: FC<AddToItineraryButtonProps> = ({
	eventOrRestaurant
}) => {
	const navigate = useNavigate()
	const { addEventToItinerary } = useCurrentProject()

	// Early return if no active itinerary addition in progress
	if (!localStorage.getItem('addItinerary')) return null

	/**
	 * Handles adding the event/restaurant to the itinerary
	 * @param e - Mouse event from the button click
	 */
	const handleAddItinerary = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()

		try {
			const addItinerary: IAddItinerary = JSON.parse(
				localStorage.getItem('addItinerary') as string
			)

			addEventToItinerary({
				dayIndex: addItinerary?.dayIndex,
				typeOfEvent: addItinerary?.typeOfEvent,
				event: eventOrRestaurant
			})

			localStorage.setItem('activeProjectTab', 'Itinerary')
			toast.success(`Added ${addItinerary.name}`, toastOptions)
			localStorage.removeItem('addItinerary')

			setTimeout(() => {
				navigate('/app/project/schedule')
			}, 700)
		} catch (error: any) {
			const errorMessage = error.message || 'Failed to add to itinerary'
			toast.error(errorMessage, errorToastOptions)
		}
	}

	return (
		<td data-testid="add-to-project-button" className="p-0">
			<Button
				variant="itinerary"
				icon="gg:insert-after-o"
				iconColor="#ea5933"
				handleClick={handleAddItinerary}
				widthIcon={24}
			>
				Add to Itinerary
			</Button>
		</td>
	)
}
