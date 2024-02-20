import { useState } from 'react'
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
import { FormPreview } from '../../preview/FormPreview'

export const RenderSchedule: React.FC = () => {
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const { selectedTab } = useScheduleContext()
	const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false)

	const togglePreview = () => setIsPreviewOpen(!isPreviewOpen)

	return (
		<div className="flex flex-col text-gray-100">
			<ScheduleHeader />
			<ScheduleMenu
				multiDestination={currentProject.multiDestination}
				onPreviewClick={togglePreview}
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
			<FormPreview isOpen={isPreviewOpen} onClose={togglePreview} />
		</div>
	)
}
