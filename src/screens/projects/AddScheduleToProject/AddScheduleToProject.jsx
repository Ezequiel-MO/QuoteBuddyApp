import { dayEventOrderedItemData } from '../../../helper/scheduleData'
import { useCurrentProject } from '../../../hooks/useCurrentProject'
import RenderSchedule from '../RenderSchedule/RenderSchedule'
import DayEventOrderedItem from './DayEventOrderedItem'

const AddScheduleToProject = () => {
  const { currentProject } = useCurrentProject()
  const { schedule } = currentProject

  const renderSchedule = schedule?.map((day, index) => (
    <li key={day.date}>
      <div className='md:flex flex-start'>
        <div className='bg-white-50 w-10 h-10 flex items-center justify-center rounded-full -ml-5'>
          <svg
            focusable='false'
            className='text-white w-5 h-5'
            role='img'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 448 512'
          >
            <path
              fill='currentColor'
              d='M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z'
            ></path>
          </svg>
        </div>
        <div className='block p-6 rounded-lg shadow-lg bg-gray-100 max-w-md ml-6 mb-10'>
          <div className='flex justify-between mb-4'>
            <h3 className='font-medium text-orange-50 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-lg'>
              {day.date}
            </h3>
          </div>

          <ol>
            {dayEventOrderedItemData.map((item) => {
              const { route, timeOfEvent, text } = item
              return (
                <div key={`${timeOfEvent}-${index}`}>
                  <DayEventOrderedItem
                    route={route}
                    dayOfEvent={index}
                    timeOfEvent={timeOfEvent}
                    text={text}
                  />
                </div>
              )
            })}

            {day.date === 'Arrival Day' ? (
              <DayEventOrderedItem
                route='project/schedule/transfers_in'
                dayOfEvent={0}
                timeOfEvent='transfer_in'
                text='transfer in'
              />
            ) : day.date === 'Departure Day' ? (
              <DayEventOrderedItem
                route='project/schedule/transfers_out'
                dayOfEvent={schedule.length - 1}
                timeOfEvent='transfer_out'
                text='transfer out'
              />
            ) : null}
          </ol>
        </div>
      </div>
    </li>
  ))

  return (
    <div className='container p-10 flex justify-around'>
      <ol className='border-l-2 border-camel-50'>
        {schedule ? renderSchedule : <h1>Click on the logo to continue</h1>}
      </ol>
      {schedule ? <RenderSchedule /> : null}
    </div>
  )
}

export default AddScheduleToProject
