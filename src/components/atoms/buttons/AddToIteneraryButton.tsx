import React, { FC } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toastOptions, errorToastOptions } from 'src/helper/toast'
import { useCurrentProject } from 'src/hooks/redux/useCurrentProject'
import { IEvent, IRestaurant } from 'src/interfaces'

interface IAddItenerary {
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

interface AddToIteneraryButtonProps {
	eventOrRestaurant: IEvent | IRestaurant
}

export const AddToIteneraryButton: FC<AddToIteneraryButtonProps> = ({
	eventOrRestaurant
}) => {
	const navigate = useNavigate()
	const { addEventToItinerary } = useCurrentProject()

	if (!localStorage.getItem('addItenerary')) return null

	const handleAddItenerary = async (
		e: React.MouseEvent<HTMLTableCellElement, MouseEvent>
	) => {
		e.stopPropagation()
		const addItenerary: IAddItenerary = JSON.parse(
			localStorage.getItem('addItenerary') as string
		)
		try {
			addEventToItinerary({
				dayIndex: addItenerary?.dayIndex,
				typeOfEvent: addItenerary?.typeOfEvent,
				event: eventOrRestaurant
			})
			localStorage.setItem('activeProjectTab', 'Itinerary')
			toast.success('add ' + addItenerary.name, toastOptions)
			localStorage.removeItem('addItenerary')
			setTimeout(() => {
				navigate('/app/project/schedule')
			}, 700)
		} catch (error: any) {
			console.log(error)
			toast.error(error.message, errorToastOptions)
		}
	}

	return (
		<td
			data-testid="add-to-project-button"
			className="cursor-pointer flex flex-row items-center"
			onClick={(e) => handleAddItenerary(e)}
		>
			<Icon icon="gg:insert-after-o" color="#ea5933" width="30" />
			<span>Add to Itinerary</span>
		</td>
	)
}
