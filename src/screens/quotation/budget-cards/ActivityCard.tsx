import { Icon } from '@iconify/react'
import * as fakeData from '../constants/fakeData'

interface Props {
	day: fakeData.DaySchedule
}

function ActivityCard({ day }: Props) {
	return (
		<div>
			{['MORNING ACTIVITY', 'LUNCH', 'AFTERNOON ACTIVITY', 'DINNER'].map(
				(activityType) => {
					const activityDetails = day[
						activityType as keyof fakeData.DaySchedule
					] as fakeData.Activity[] | undefined
					if (activityDetails && activityDetails.length > 0) {
						return (
							<div
								key={activityType}
								className="mt-4 bg-gray-700 p-4 rounded-md shadow-md"
							>
								<div className="text-sm font-bold text-white mb-4">
									{activityType.replace('_', ' ')}
								</div>
								<div className="grid grid-cols-12 gap-4 text-white mb-2">
									<div className="col-span-6 text-sm font-bold"></div>
									<div className="col-span-2 text-sm font-bold text-right">
										Pax
									</div>
									<div className="col-span-2 text-sm font-bold text-right">
										Price
									</div>
									<div className="col-span-2 text-sm font-bold text-right">
										Total
									</div>
								</div>
								{activityDetails.map((detail, index) => (
									<div
										key={index}
										className="grid grid-cols-12 gap-4 items-center mt-2"
									>
										<div className="col-span-6 text-lg font-medium text-gray-300">
											{detail.name}
										</div>
										<div className="col-span-2 text-lg text-gray-300 text-right">
											x {detail.nrPax}
										</div>
										<div className="col-span-2 text-lg text-orange-600 text-right">
											€{detail.price}
										</div>
										<div className="col-span-2 text-lg text-white text-right">
											€{detail.total}
										</div>
										<div className="col-span-12 flex items-center justify-start">
											<Icon
												icon="mdi:plus-circle-outline"
												className="text-gray-400 cursor-pointer hover:text-gray-200"
												onClick={() => {
													/* Placeholder for add transfer logic */
												}}
											/>
											<span className="ml-2 text-sm text-gray-400">
												Add Transfer
											</span>
										</div>
									</div>
								))}
							</div>
						)
					}
					return null
				}
			)}
		</div>
	)
}

export default ActivityCard
