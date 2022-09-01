import { useState } from 'react'
import { Icon } from '@iconify/react'
import { useCurrentProject } from '../../../hooks/useCurrentProject'
import AddMeetingToProject from './AddMeetingToProject'

const DisplayMeetingDays = () => {
  const [meetingForm, setMeeting] = useState({
    date: '',
    open: false,
    timing: ''
  })
  const { currentProject } = useCurrentProject()
  const { schedule } = currentProject

  const handleMeeting = (date, timing) => {
    setMeeting({
      ...meetingForm,
      date,
      open: !meetingForm.open,
      timing
    })
  }

  return (
    <div className='flex flex-col ml-10 mt-3 w-[200px]'>
      {schedule.map((day) => (
        <div
          key={day._id}
          className='flex flex-row items-center border border-orange-50 rounded-md border-dashed bg-black-50 p-2 my-2 ml-3 cursor-pointer'
        >
          <Icon icon='bi:arrow-return-right' color='white' width={30} />
          <div className='ml-3 text-white-100 grid grid-cols-1'>
            <div className='uppercase'>{day.date}</div>
            <span
              onClick={() => handleMeeting(day.date, 'Morning Meeting')}
              className='indent-3 hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer'
            >
              Morning Meeting
            </span>
            <span
              onClick={() => handleMeeting(day.date, 'Afternoon Meeting')}
              className='indent-3 hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer'
            >
              Afternoon Meeting
            </span>
            <span
              onClick={() => handleMeeting(day.date, 'All day')}
              className='indent-3 hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer'
            >
              All Day
            </span>
          </div>
        </div>
      ))}
      {meetingForm.open && (
        <div className='absolute top-[145px] left-[280px] right-0 bottom-[135px] border border-white-50 p-5 rounded-lg bg-black-50'>
          <AddMeetingToProject
            date={meetingForm.date}
            timing={meetingForm.timing}
          />
        </div>
      )}
    </div>
  )
}

export default DisplayMeetingDays
