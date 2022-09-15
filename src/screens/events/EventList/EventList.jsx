import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import baseAPI from '../../../axios/axiosConfig'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../helper/toast'
import EventListItem from './EventListItem'
import CityFilter from '../../../ui/filters/CityFilter'
import PriceFilter from '../../../ui/filters/PriceFilter'
import Spinner from '../../../ui/spinner/Spinner'
import 'react-toastify/dist/ReactToastify.css'
import { useCurrentProject } from '../../../hooks/useCurrentProject'
import TableHeaders from '../../../ui/TableHeaders'
import useGetEvents from '../../../hooks/useGetEvents'

const EventList = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [event] = useState({})
  const { currentProject } = useCurrentProject()
  const { groupLocation } = currentProject
  const [city, setCity] = useState(groupLocation || '')
  const [price, setPrice] = useState(0)
  const { events, isLoading } = useGetEvents(city, price)
  const currentProjectIsLive = Object.keys(currentProject).length !== 0

  const addEventToProject = (event) => {
    navigate(`/app/project/schedule/${event._id}`, {
      state: {
        event,
        dayOfEvent: location.state.dayOfEvent,
        timeOfEvent: location.state.timeOfEvent
      }
    })
  }

  const eventList = events
    .slice(0, 15)
    .map((event) => (
      <EventListItem
        key={event._id}
        event={event}
        addEventToProject={addEventToProject}
        canBeAddedToProject={location.state}
      />
    ))

  return (
    <>
      <div className='flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8'>
        <div className='flex flex-col w-full'>
          <h1 className='text-2xl'>Event List</h1>
          <div className='flex flex-row justify-start'>
            <div>
              {currentProjectIsLive ? null : <CityFilter setCity={setCity} />}
              <PriceFilter setPrice={setPrice} />
            </div>
            <button
              onClick={() => navigate('/app/event/specs', { state: { event } })}
              className='focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded'
            >
              Create New Event
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className='flex-1 m-4 flex-col'>
        {isLoading ? (
          <Spinner />
        ) : (
          <table className='w-full p-5'>
            <TableHeaders headers='event' />
            {eventList}
          </table>
        )}
      </div>
    </>
  )
}

export default EventList
