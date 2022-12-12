import { useCurrentProject } from '../../../hooks'
import AddScheduleAndIntroToProject from '../AddIntro/AddScheduleAndIntroToProject'
import ScheduleHeader from './ScheduleHeader'
import TransferInSchedule from './TransferInSchedule'
import HotelSchedule from './HotelSchedule'
import TransferOutSchedule from './TransferOutSchedule'
import TableSchedule from './TableSchedule'

const RenderSchedule = () => {
  const { currentProject } = useCurrentProject()

  return (
    <div className='container w-3/4 flex flex-col'>
      <ScheduleHeader />
      <br />
      <TransferInSchedule />
      <HotelSchedule />
      <TableSchedule />
      <TransferOutSchedule />
      <AddScheduleAndIntroToProject project={currentProject} />
    </div>
  )
}

export default RenderSchedule
