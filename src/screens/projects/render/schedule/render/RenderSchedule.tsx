import { useCurrentProject } from '../../../../../hooks'
import { AddFullProgramToDataBase } from '../../../add/toDataBase/AddFullProgramToDataBase'
import { HotelSchedule } from '../../hotel/HotelSchedule'
import { ScheduleHeader } from './ScheduleHeader'
import { TableSchedule } from './TableSchedule'
import { TableMeeting } from './TableMeeting'
import { TransferInSchedule, TransferOutSchedule } from '../transfers'
import { IProject } from '@interfaces/project'
import { ScheduleMenu } from './ScheduleMenu'
import { useScheduleContext } from './ScheduleContext'
import { TableItinerary } from '../itinerary/TableItinerary'
import BudgetVisualizer from '../../preview/BudgetVisualizer'
import { useProject } from '@screens/projects/context/CompanyContext'

export const RenderSchedule: React.FC = () => {
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const { selectedTab } = useScheduleContext()
	const { dispatch } = useProject()

	return (
		<div className="flex flex-col text-gray-100">
			<ScheduleHeader />
			<ScheduleMenu
				multiDestination={currentProject.multiDestination}
				onPreviewClick={() => dispatch({ type: 'TOGGLE_BUDGET_VISUALIZER' })}
			/>
			<div className="my-4" />
			{selectedTab === 'Transfers IN' && <TransferInSchedule />}
			{selectedTab === 'Hotels' && <HotelSchedule />}
			{selectedTab === 'Meetings' && (
				<>
					<HotelSchedule />
					<TableMeeting />
				</>
			)}
			{selectedTab === 'Schedule' && <TableSchedule />}
			{selectedTab === 'Itinerary' && <TableItinerary />}
			{selectedTab === 'Transfers OUT' && <TransferOutSchedule />}
			<AddFullProgramToDataBase project={currentProject} />
			<BudgetVisualizer />
		</div>
	)
}
