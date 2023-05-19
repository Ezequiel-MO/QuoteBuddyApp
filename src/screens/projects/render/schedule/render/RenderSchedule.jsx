import { useCurrentProject } from '../../../../../hooks'
import { AddFullProgramToDataBase } from '../../../add/toDataBase/AddFullProgramToDataBase'
import { HotelSchedule } from '../../hotel/HotelSchedule'
import { ScheduleHeader } from './ScheduleHeader'
import { TableSchedule } from './TableSchedule'
import { TransferInSchedule, TransferOutSchedule } from '../transfers'

export const RenderSchedule = () => {
	const { currentProject } = useCurrentProject()

	return (
		<div className="flex flex-col">
			<ScheduleHeader />
			<br />
			<TransferInSchedule />
			<HotelSchedule />
			<TableSchedule />
			<TransferOutSchedule />
			<AddFullProgramToDataBase project={currentProject} />
		</div>
	)
}
