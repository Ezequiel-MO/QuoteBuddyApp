import { useState, useEffect } from 'react'
import baseAPI from '../../axios/axiosConfig'

const CityFilter = ({ setCity, city }) => {
  const [options, setOptions] = useState(
    JSON.parse(localStorage.getItem('locations')) || []
  )

  useEffect(() => {
    const getLocations = async () => {
      const response = await baseAPI.get(`v1/locations`)
      const locations = response.data.data.data
      localStorage.setItem('locations', JSON.stringify(locations))
      setOptions(locations)
    }
    getLocations()
  }, [city])

  return (
    <div className='w-60 max-w-sm my-2 ml-0 mr-0'>
      <form>
        <div className='flex items-center gap-2'>
          <select
            id='city'
            className='flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value='none'>--- Filter by city ---</option>
            {options.map((location) => (
              <option key={location.name} value={location.name}>
                {` --- ${location.name} --- `}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  )
}

export default CityFilter
