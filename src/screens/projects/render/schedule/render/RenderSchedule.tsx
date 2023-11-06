import { useCurrentProject } from '../../../../../hooks'
import { AddFullProgramToDataBase } from '../../../add/toDataBase/AddFullProgramToDataBase'
import { HotelSchedule } from '../../hotel/HotelSchedule'
import { ScheduleHeader } from './ScheduleHeader'
import { TableSchedule } from './TableSchedule'
import { TransferInSchedule, TransferOutSchedule } from '../transfers'
import { IProject } from '@interfaces/project'
import { ScheduleMenu } from './ScheduleMenu'
import { useScheduleContext } from './ScheduleContext'

export const RenderSchedule: React.FC = () => {
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const { selectedTab } = useScheduleContext()

	return (
		<div className="flex flex-col">
			<ScheduleHeader />
			<ScheduleMenu />
			<br />

			{selectedTab === 'Transfers IN' && <TransferInSchedule />}
			{selectedTab === 'Hotels' && <HotelSchedule />}
			{selectedTab === "Meetings" && <HotelSchedule />}
			{selectedTab === 'Schedule' && <TableSchedule />}
			{selectedTab === 'Transfers OUT' && <TransferOutSchedule />}
			<AddFullProgramToDataBase project={currentProject} />
		</div>
	)
}
