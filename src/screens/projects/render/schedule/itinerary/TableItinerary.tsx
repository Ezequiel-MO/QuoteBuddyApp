import { useState } from "react"
import { useCurrentProject } from 'src/hooks'
import { TableHeaders } from 'src/ui'
import { ItineraryAdd } from './ItineraryAdd'
import { ItineraryModal } from "./modal/ItineraryModal"
import { TransfersProvider } from '../../../add/toProject/transfers/render/context'
import { ItineraryTransferRender } from "./ItineraryTransferRender"
import { IItinerary } from "src/interfaces"



export const TableItinerary: React.FC = () => {
	const { currentProject } = useCurrentProject()

	const [openModal, setOpenModal] = useState(false)
	const [dayIndex, setDayIndex] = useState<number>()
	const [itinerary, setItinerary] = useState<IItinerary>()


	const handleDeleteEvent = () => { }

	return (
		<table className="table-auto border-collapse border-2 border-white-0 text-white-0">
			<TransfersProvider>
				<ItineraryModal
					openModal={openModal}
					setOpenModal={setOpenModal}
					dayIndex={dayIndex}
					itinerary={itinerary}
				/>
			</TransfersProvider>
			<TableHeaders headers="projectBaseItinerary" />
			<tbody>
				{currentProject.schedule.map((day, index) => {
					return (
						<tr key={day._id} className="border border-gray-600 bg-gray-800">
							<td className="px-4 py-2 text-white-0 text-sm font-medium bg-gray-700 border border-gray-600">
								{day.date}
							</td>
							<td className="p-2">
								{
									day.itinerary.itinerary.length === 0 ?
										<>
											<ItineraryAdd
												setOpenModal={setOpenModal}
												dayIndex={index}
												setDayIndex={setDayIndex}
												setItinerary={setItinerary}
											/>
										</>
										:
										<ItineraryTransferRender
											itinerary={day.itinerary}
											setItinerary={setItinerary}
											setOpenModal={setOpenModal}
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
	)
}
