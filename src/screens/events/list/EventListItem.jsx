import { useNavigate } from 'react-router-dom'
import { AddToProjectButton, ButtonDeleted } from '../../../components/atoms'
import { formatMoney } from '../../../helper'

const EventListItem = ({
	event,
	addEventToProject,
	canBeAddedToProject,
	setEvents,
	events
}) => {
	const navigate = useNavigate()

	return (
		<tbody>
			<tr className="mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50">
				<td
					onClick={() =>
						navigate(`/app/event/specs`, {
							state: { event }
						})
					}
					className="hover:text-blue-600 hover:underline cursor-pointer"
				>
					{event.name}
				</td>
				<td>{event.city}</td>
				<td>{formatMoney(event.price)}</td>
				<td>{event.pricePerPerson ? 'TRUE' : 'FALSE'}</td>
				<td className="cursor-pointer">
					<ButtonDeleted
						endpoint={'events'}
						ID={event._id}
						setter={setEvents}
						items={events}
					/>
				</td>
				<AddToProjectButton
					canBeAddedToProject={canBeAddedToProject}
					onAdd={() => addEventToProject(event)}
				/>
			</tr>
		</tbody>
	)
}

export default EventListItem
