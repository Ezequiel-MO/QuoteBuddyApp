import { Icon } from '@iconify/react'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../helper/toast'
import { useCurrentProject } from '../../../../../hooks'
import { TableHeaders } from '../../../../../ui'

export const TableSchedule = () => {
	const { currentProject, removeEventFromSchedule } = useCurrentProject()
	const handleDeleteEvent = (dayOfEvent, timeOfEvent, eventId) => {
		removeEventFromSchedule({ dayOfEvent, timeOfEvent, eventId })
		toast.success('Event Removed', toastOptions)
	}

	return (
		<table className="table-auto border-collapse border border-white-50 text-white-50">
			<TableHeaders headers="projectBase" />
			<tbody>
				{currentProject['schedule']?.map((day, index) => (
					<tr key={day._id} className="border border-white-100">
						<td>{day.date}</td>
						<td>
							{day['morningEvents'].map((event) => (
								<div key={event._id} className="flex flex-row items-center">
									<p>{event.name}</p>
									<span
										className="ml-2 cursor-pointer"
										onClick={() =>
											handleDeleteEvent(index, 'morningEvents', event._id)
										}
									>
										<Icon icon="lucide:delete" color="#ea5933" />
									</span>
								</div>
							))}
						</td>
						<td>
							{day['lunch'].map((event) => (
								<div key={event._id} className="flex flex-row items-center">
									<p>{event.name}</p>
									<span
										className="ml-2 cursor-pointer"
										onClick={() => handleDeleteEvent(index, 'lunch', event._id)}
									>
										<Icon icon="lucide:delete" color="#ea5933" />
									</span>
								</div>
							))}
						</td>
						<td>
							{day['afternoonEvents'].map((event) => (
								<div key={event._id} className="flex flex-row items-center">
									<p>{event.name}</p>
									<span
										className="ml-2 cursor-pointer"
										onClick={() =>
											handleDeleteEvent(index, 'afternoonEvents', event._id)
										}
									>
										<Icon icon="lucide:delete" color="#ea5933" />
									</span>
								</div>
							))}
						</td>
						<td>
							{day['dinner'].map((event) => (
								<div key={event._id} className="flex flex-row items-center">
									<p>{event.name}</p>
									<span
										className="ml-2 cursor-pointer"
										onClick={() =>
											handleDeleteEvent(index, 'dinner', event._id)
										}
									>
										<Icon icon="lucide:delete" color="#ea5933" />
									</span>
								</div>
							))}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
