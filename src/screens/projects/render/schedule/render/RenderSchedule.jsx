import { useCurrentProject } from '../../../../../hooks'
import { AddFullProgramToDataBase } from '../../../add/toDataBase/AddFullProgramToDataBase'
import { HotelSchedule } from '../../hotel/HotelSchedule'
import { ScheduleHeader } from './ScheduleHeader'
import { TableSchedule } from './TableSchedule'
import { TransferInSchedule } from '../transfers/TransferInSchedule'
import { TransferOutSchedule } from '../transfers/TransferOutSchedule'

export const RenderSchedule = () => {
	const { currentProject } = useCurrentProject()

	return (
		<div className="container w-3/4 flex flex-col">
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
