import { useCurrentProject } from 'src/hooks'
import { TableHeaders } from 'src/ui'
import { ItineraryAdd } from './ItineraryAdd'

export const TableItinerary: React.FC = () => {
	const { currentProject } = useCurrentProject()

	const handleDeleteEvent = () => {}

	return (
		<table className="table-auto border-collapse border-2 border-white-0 text-white-0">
			<TableHeaders headers="projectBaseItinerary" />
			<tbody>
				{currentProject.schedule.map((day, index) => {
					return (
						<tr key={day._id} className="border border-gray-600 bg-gray-800">
							<td className="px-4 py-2 text-white-0 text-sm font-medium bg-gray-700 border border-gray-600">
								{day.date}
							</td>
							<td className="p-2">
								<ItineraryAdd />
							</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}
