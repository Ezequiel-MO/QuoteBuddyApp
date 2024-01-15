import { useState } from "react"
import { useCurrentProject } from 'src/hooks'
import { TableHeaders } from 'src/ui'
import { ItineraryAddTransfer } from './ItineraryAddTransfer'
import { ItineraryModal } from "./modal/ItineraryModal"
import { TransfersProvider } from '../../../add/toProject/transfers/render/context'
import { ItineraryTransferRender } from "./ItineraryTransferRender"
import { ItineraryDayActivities } from "./activity/ItineraryDayActivities"
import { ItineraryDayMeals } from "./meal/ItineraryDayMeals"

type Time = "morning" | "afternoon" | "night" | ""

export const TableItinerary: React.FC = () => {
	const { currentProject } = useCurrentProject()

	const [dayIndex, setDayIndex] = useState<number>()

	const isLunch = (starts: Time, ends: Time) => {
		switch (starts) {
			case "morning":
				if (ends === "afternoon" || ends === "night") {
					return true
				}
				return false
			case "afternoon":
				return true
			default:
				false
		}
	}


	return (
		<TransfersProvider>
			<table className="table-auto border-collapse border-2 border-white-0 text-white-0">
				<ItineraryModal
					dayIndex={dayIndex}
				/>
				<TableHeaders headers="projectBaseItinerary" />
				<tbody>
					{currentProject.schedule.map((day, index) => {
						return (
							<tr key={day._id} className="border border-gray-600 bg-gray-800">
								<td className="px-4 py-2 text-white-0 text-sm font-medium bg-gray-700 border border-gray-600">
									{day.date}
								</td>
								<td className={`p-2 ${day.itinerary.itinerary.length > 0 && " min-w-[330px] max-w-[380px]"}`}>
									{
										day.itinerary.itinerary.length === 0 ?
											<>
												<ItineraryAddTransfer
													dayIndex={index}
													setDayIndex={setDayIndex}
												/>
											</>
											:
											<ItineraryTransferRender
												itinerary={day.itinerary}
												dayIndex={index}
												setDayIndex={setDayIndex}
												date={day.date}
											/>
									}
								</td>
								<td className="p-2">
									{
										day.itinerary.starts === "morning" &&
										<ItineraryDayActivities
										dayIndex={index}
										itinerary={day?.itinerary}
										name="morningActivity"
										date={day.date}
										/>
									}
								</td>
								<td className="p-2 ">
									{
										isLunch(day.itinerary.starts, day.itinerary.ends) &&
										<ItineraryDayMeals dayIndex={index} itinerary={day?.itinerary} name="lunch" date={day.date} />
									}
								</td>
								<td className="p-2">
									{
										isLunch(day.itinerary.starts, day.itinerary.ends) &&
										<ItineraryDayActivities
											dayIndex={index}
											itinerary={day?.itinerary}
											name="afternoonActivity"
											date={day.date}
										/>
									}
								</td>
								<td className="p-2">
									{
										day.itinerary.ends === "night" &&
										<ItineraryDayMeals dayIndex={index} itinerary={day?.itinerary} name="dinner" date={day.date} />
									}
								</td>
								<td className="p-2">
									{
										day.itinerary.ends === "night" &&
										<ItineraryDayActivities
											dayIndex={index}
											itinerary={day?.itinerary}
											name="nightActivity"
											date={day.date}
										/>
									}
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</TransfersProvider>
	)
}
