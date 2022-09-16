import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HotelListItem from './HotelListItem'
import CityFilter from '../../../ui/filters/CityFilter'
import NrStarsFilter from '../../../ui/filters/NrStarsFilter'
import NrHotelRoomsFilter from '../../../ui/filters/NrHotelRoomsFilter'
import Spinner from '../../../ui/spinner/Spinner'
import { useCurrentProject } from '../../../hooks/useCurrentProject'
import TableHeaders from '../../../ui/TableHeaders'
import useGetHotels from '../../../hooks/useGetHotels'
import SearchInput from '../../../ui/inputs/SearchInput'

const HotelList = () => {
  const navigate = useNavigate()
  const [hotel] = useState({})
  const [numberStars, setNumberStars] = useState(0)
  const [numberRooms, setNumberRooms] = useState(0)
  const [searchItem, setSearchItem] = useState('')
  const { currentProject } = useCurrentProject()
  const { groupLocation } = currentProject
  const [city, setCity] = useState(groupLocation || '')
  const { hotels, setHotels, isLoading } = useGetHotels(
    city,
    numberStars,
    numberRooms
  )
  const [foundHotels, setFoundHotels] = useState([])

  useEffect(() => {
    setFoundHotels(hotels)
  }, [hotels])

  const currentProjectIsLive = Object.keys(currentProject).length !== 0

  const filterList = (e) => {
    setSearchItem(e.target.value)
    const result = hotels.filter((data) => data.name.includes(e.target.value))
    setFoundHotels(result)
    if (searchItem === '') {
      setFoundHotels(hotels)
    }
  }

  const hotelList = foundHotels?.map((hotel) => (
    <HotelListItem
      key={hotel._id}
      hotel={hotel}
      hotels={hotels}
      setHotels={setHotels}
      canBeAddedToProject={currentProjectIsLive}
    />
  ))

  return (
    <>
      <div className='flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8'>
        <div className='flex flex-col w-full'>
          <h1 className='text-2xl'>Hotel List</h1>
          <div className='flex flex-row justify-start items-center'>
            <div>
              {currentProjectIsLive ? null : (
                <CityFilter setCity={setCity} city={city} />
              )}
              <NrStarsFilter
                setNumberStars={setNumberStars}
                numberStars={numberStars}
              />
              <NrHotelRoomsFilter
                setNumberRooms={setNumberRooms}
                numberRooms={numberRooms}
              />
            </div>
            <button
              onClick={() => navigate('/app/hotel/specs', { state: { hotel } })}
              className='focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded'
            >
              Create New Hotel
            </button>
            <SearchInput searchItem={searchItem} filterList={filterList} />
          </div>
        </div>
      </div>
      <hr />

      {isLoading ? (
        <Spinner />
      ) : (
        <table className='w-full p-5'>
          <TableHeaders headers='hotel' />
          {hotelList}
        </table>
      )}
    </>
  )
}

export default HotelList
