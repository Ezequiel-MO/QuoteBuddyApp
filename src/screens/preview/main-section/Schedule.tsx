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
		<div className="space-y-8">
			{/* Header with dates */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
				<h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white-0 flex items-center mb-3 md:mb-0 group">
					<Icon
						icon="mdi:calendar-month-outline"
						className="mr-3 text-orange-500 group-hover:scale-110 transition-transform duration-300"
						width="36"
						height="36"
					/>
					<span className="relative">
						Program Schedule
						<span className="absolute -bottom-1 left-0 w-full h-1 bg-orange-500 rounded-full"></span>
					</span>
				</h2>

				{!hideDates && formattedArrival && formattedDeparture && (
					<div className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium bg-gradient-to-r from-cyan-50 to-orange-100 dark:from-gray-800 dark:to-gray-700 px-5 py-3 rounded-xl flex items-center shadow-sm transition-all duration-300 hover:shadow-md">
						<Icon
							icon="mdi:calendar-range"
							className="mr-3 text-orange-500"
							width="22"
							height="22"
						/>
						<span>
							<span className="text-orange-500 font-semibold">Trip :</span>{' '}
							{formattedArrival} – {formattedDeparture}
						</span>
					</div>
				)}
			</div>

			{/* Schedule days navigation */}
			{!hideDates && schedule?.length > 1 && (
				<div className="flex overflow-x-auto py-3 mb-6 -mx-2 px-2 scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-100 dark:scrollbar-track-gray-800 scroll-smooth">
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
									className="flex-shrink-0 flex flex-col items-center px-5 py-3 mx-2 
                           rounded-xl hover:bg-orange-100 dark:hover:bg-gray-700
                           transition-all duration-200 cursor-pointer transform hover:-translate-y-1
                           border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 hover:shadow-md"
								>
									<span className="text-xs font-medium text-gray-500 dark:text-gray-400">
										{dayName}
									</span>
									<span className="text-2xl font-bold text-gray-800 dark:text-white-0 my-1">
										{dayNumber}
									</span>
									<span className="text-xs uppercase tracking-wider font-medium text-orange-500">
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
			<div className="space-y-10">
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
		</div>
	)
}

export default Schedule
