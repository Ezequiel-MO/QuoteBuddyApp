import { Icon } from '@iconify/react'
import OTLogic from './OTLogic'
import { ISetting } from '@interfaces/setting'
import { useCurrentProject, useLocalStorageItem } from 'src/hooks'

type TimeOfDay = 'morningEvents' | 'afternoonEvents' | 'lunch' | 'dinner'

const OverviewTable = () => {
	const { currentProject } = useCurrentProject()
	const { arrivalDay, departureDay, schedule, clientCompany, hideDates } =
		currentProject
	const { fonts = [], colorPalette = [] } = clientCompany[0] || {}
	const item = useLocalStorageItem('settings', {}) as unknown as ISetting
	const secondary = item?.colorPalette?.secundary

	const iconColor = colorPalette.length > 0 ? colorPalette[2] : secondary
	const { transformDates, getDays, getEvents, renderEvent } = OTLogic()

	return (
		<div className="shadow-lg rounded-lg overflow-hidden bg-green-100 dark:bg-gray-800 text-black-50 dark:text-white-0">
			<table className="min-w-full leading-normal">
				<thead>
					<tr className="bg-gray-100 dark:bg-gray-700 text-left">
						<th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 text-sm">
							{transformDates(arrivalDay, departureDay)}
						</th>
						{!hideDates ? (
							getDays(arrivalDay, departureDay).map((day) => (
								<th
									key={day}
									className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 text-sm"
								>
									{day}
								</th>
							))
						) : (
							<th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 text-sm">
								Options
							</th>
						)}
					</tr>
				</thead>
				<tbody>
					{['morningEvents', 'lunch', 'afternoonEvents', 'dinner'].map(
						(meal, mealIndex) => (
							<tr key={`${mealIndex}_${meal}`}>
								<td className="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm">
									<div className="flex items-center">
										<span className="ml-2">
											<Icon
												icon={mealIconMap[meal as TimeOfDay]}
												color={iconColor}
												width="35"
											/>
										</span>
									</div>
								</td>
								{getEvents(schedule, meal as TimeOfDay)?.map(
									(event, eventIndex) => (
										<td
											key={`${meal}-${
												event && event[0]?.id
													? event[0].id
													: `eventIndex-${eventIndex}`
											}`}
											className="px-5 py-5 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm cursor-pointer"
										>
											<a
												href={`#${event && event[0]?.id}`}
												className="text-blue-500 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500"
											>
												{event && renderEvent(event)}
											</a>
										</td>
									)
								)}
							</tr>
						)
					)}
				</tbody>
			</table>
		</div>
	)
}

const mealIconMap = {
	morningEvents: 'mdi:weather-sunset-up',
	lunch: 'bx:bx-restaurant',
	afternoonEvents: 'mdi:weather-sunset-down',
	dinner: 'cil:dinner'
}

export default OverviewTable
