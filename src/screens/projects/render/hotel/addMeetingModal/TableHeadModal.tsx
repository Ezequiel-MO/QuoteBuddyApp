import { IDay } from '@interfaces/project'
import { TableForm } from './TableForm'
import { Icon } from '@iconify/react'

interface TableHeadModalProps {
	day: IDay
	dayOfEvent: number
	openForm: Record<string, boolean>
	setOpenForm: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
	meetingValues: Record<string, any>
	setMeetingValues: React.Dispatch<React.SetStateAction<Record<string, any>>>
}

export const TableHeadModal: React.FC<TableHeadModalProps> = ({
	day,
	dayOfEvent,
	openForm,
	setOpenForm,
	meetingValues,
	setMeetingValues
}) => {
	const dayMeeting = day.date
	const open = openForm[day.date]
	const timesMeeting = [
		{ name: 'Morning', timeOfEvent: 'morningMeetings' },
		{ name: 'Afternoon', timeOfEvent: 'afternoonMeetings' },
		{ name: 'Full Day', timeOfEvent: 'fullDayMeetings' }
	]

	const handleOpenForm = () => {
		setOpenForm({
			...openForm,
			[dayMeeting]: !openForm[dayMeeting]
		})
	}

	return (
		<div className="rounded-lg shadow-md bg-gray-800 overflow-hidden mb-6 transition-all duration-300">
			<button
				onClick={handleOpenForm}
				className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-gray-700 to-gray-800 text-white-50 hover:from-gray-600 hover:to-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50"
			>
				<span className="text-xl font-semibold flex items-center">
					<Icon
						icon="material-symbols:calendar-month"
						className="mr-2 text-cyan-400"
						width="24"
						height="24"
					/>
					{dayMeeting}
				</span>
				<div className="flex items-center">
					<span className="text-sm text-gray-300 mr-2">
						{open ? 'Hide details' : 'Show details'}
					</span>
					<Icon
						icon={open ? 'mdi:chevron-up' : 'mdi:chevron-down'}
						className="text-cyan-400 transition-transform duration-300"
						width="20"
						height="20"
					/>
				</div>
			</button>

			{open && (
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-700">
						<thead>
							<tr className="bg-gray-900">
								<th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									Schedule
								</th>
								<th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									Room Capacity
								</th>
								<th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									Coffee Break Units
								</th>
								<th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									Coffee Break Price
								</th>
								<th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									Audiovisuals
								</th>
								<th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									HD Delegate Rate
								</th>
								<th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									Lunch Units
								</th>
								<th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									Lunch Price
								</th>
								<th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									Dinner Units
								</th>
								<th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									Dinner Price
								</th>
								<th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									FD Room Rental
								</th>
								<th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
									HD Room Rental
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-700 bg-gray-800">
							{timesMeeting.map((el, index) => (
								<TableForm
									id={index}
									name={el.name}
									timeOfEvent={el.timeOfEvent}
									key={index}
									dayOfEvent={dayOfEvent}
									meetingValues={meetingValues}
									setMeetingValues={setMeetingValues}
								/>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	)
}
