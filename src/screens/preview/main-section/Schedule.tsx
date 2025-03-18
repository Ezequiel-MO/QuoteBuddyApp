import { IProject } from '@interfaces/project'
import { checkDayIsEmpty } from 'src/helper/checkEmptyDay'
import { useCurrentProject } from 'src/hooks'
import { ScheduleDay } from './ScheduleDay'
import { format, parse } from 'date-fns'
import { Icon } from '@iconify/react'

const Schedule = () => {
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const {
		schedule,
		hideDates,
		suplementaryText,
		arrivalDay,
		departureDay,
		multiDestination
	} = currentProject

	const formatDate = (dateStr: string) => {
		try {
			return format(parse(dateStr, 'yyyy-MM-dd', new Date()), 'MMMM do, yyyy')
		} catch (error) {
			return dateStr
		}
	}

	const formattedArrival = arrivalDay ? formatDate(arrivalDay) : ''
	const formattedDeparture = departureDay ? formatDate(departureDay) : ''
	return (
		<div className="space-y-6">
			{/* Header with dates */}
			<div className="flex flex-col md:flex-row md:items-end md:justify-between mb-4">
				<h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white-0 flex items-center mb-2 md:mb-0">
					<Icon
						icon="mdi:calendar-month-outline"
						className="mr-3 text-orange-500"
						width="32"
						height="32"
					/>
					Program Schedule
				</h2>

				{!hideDates && formattedArrival && formattedDeparture && (
					<div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg flex items-center">
						<Icon
							icon="mdi:calendar-range"
							className="mr-2 text-orange-500"
							width="20"
						/>
						<span>
							{formattedArrival} – {formattedDeparture}
						</span>
					</div>
				)}
			</div>
			{/* Schedule days navigation */}
			{!hideDates && schedule?.length > 1 && (
				<div className="flex overflow-x-auto py-2 mb-4 -mx-2 px-2 scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
					{schedule.map((day, index) => {
						if (checkDayIsEmpty(day)) return null

						try {
							const date = parse(day.date, 'yyyy-MM-dd', new Date())
							const dayNumber = format(date, 'd')
							const dayName = format(date, 'EEE')
							const monthName = format(date, 'MMM')

							return (
								<a
									key={index}
									href={`#${day.date}_id`}
									className="flex-shrink-0 flex flex-col items-center px-4 py-2 mx-1 
                           rounded-lg hover:bg-orange-100 dark:hover:bg-gray-700
                           transition-colors duration-200 cursor-pointer
                           border border-gray-200 dark:border-gray-700"
								>
									<span className="text-xs font-medium text-gray-500 dark:text-gray-400">
										{dayName}
									</span>
									<span className="text-xl font-bold text-gray-800 dark:text-white-0">
										{dayNumber}
									</span>
									<span className="text-xs font-medium text-gray-500 dark:text-gray-400">
										{monthName}
									</span>
								</a>
							)
						} catch (error) {
							return null
						}
					})}
				</div>
			)}
			{/* Days container */}

			{schedule?.map((day, index) => {
				const dayIsEmpty = checkDayIsEmpty(day)
				if (!dayIsEmpty || (dayIsEmpty && multiDestination)) {
					return (
						<ScheduleDay
							key={day._id}
							day={day}
							index={index}
							suplementaryText={suplementaryText}
							arrivalDay={arrivalDay}
						/>
					)
				}
				return null
			})}
		</div>
	)
}

export default Schedule
