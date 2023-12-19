import { useState } from "react"
import { useCurrentProject } from 'src/hooks'
import { TableHeaders } from 'src/ui'
import { ItineraryAdd } from './ItineraryAdd'
import { ItineraryModal } from "./modal/ItineraryModal"
import { TransfersProvider } from '../../../add/toProject/transfers/render/context'
import { ItineraryTransferRender } from "./ItineraryTransferRender"


export const TableItinerary: React.FC = () => {
	const { currentProject } = useCurrentProject()

	const [dayIndex, setDayIndex] = useState<number>()


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
								<td className="max-w-[40px] px-4 py-2 text-white-0 text-sm font-medium bg-gray-700 border border-gray-600">
									{day.date}
								</td>
								<td className="p-2 max-w-[140px]">
									{
										day.itinerary.itinerary.length === 0 ?
											<>
												<ItineraryAdd
													dayIndex={index}
													setDayIndex={setDayIndex}
												/>
											</>
											:
											<ItineraryTransferRender
												itinerary={day.itinerary}
												dayIndex={index}
												setDayIndex={setDayIndex}
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
