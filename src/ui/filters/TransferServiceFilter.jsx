import { useEffect, useState } from 'react'
import baseAPI from '../../axios/axiosConfig'

const TransferServiceFilter = ({
  company,
  vehicleCapacity,
  service,
  setService
}) => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    const getServicesByCompanyAndVehicleSize = async () => {
      try {
        const response = await baseAPI.get(
          `v1/transfers?company=${company}&vehicleCapacity=${vehicleCapacity}`
        )
        const serviceOptions = Object.keys(response.data.data.data[0]).filter(
          (key) =>
            [
              'city',
              'company',
              '_id',
              'vehicleType',
              'vehicleCapacity',
              'selectedService'
            ].indexOf(key) === -1
        )

        setOptions(serviceOptions)
      } catch (error) {
        console.log(error)
      }
    }

    if (vehicleCapacity) {
      getServicesByCompanyAndVehicleSize()
    }
  }, [vehicleCapacity])

  return (
    <div className='w-60 max-w-sm my-2 ml-0 mr-0'>
      <form>
        <div className='flex items-center gap-2'>
          <select
            id='transferService'
            value={service}
            className='flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer'
            onChange={(e) => setService(e.target.value)}
          >
            <option value=''>--- Type of Service ---</option>
            {options.map((service) => (
              <option key={service} value={service}>
                {` --- ${
                  service === 'dispo_4h'
                    ? '4 Hours at Disposal'
                    : service === 'dispo_4h_airport'
                    ? '4 Hours at Disposal from Airport'
                    : service === ' dispo_4h_night'
                    ? '4 Hours at Disposal Night hours'
                    : service === 'dispo_5h_out'
                    ? '5 Hours at Disposal Out of City'
                    : service === 'dispo_6h_night'
                    ? '6 Hours at Disposal Night hours'
                    : service === 'dispo_6h'
                    ? '6 Hours at Disposal'
                    : service === 'dispo_9h'
                    ? '9 Hours at Disposal'
                    : service === 'hextra_night'
                    ? 'Extra hours night time'
                    : service === 'transfer_in'
                    ? 'Transfer IN'
                    : service === 'transfer_out'
                    ? 'Transfer OUT'
                    : service === 'transfer_in_out_night'
                    ? 'Transfer in/out of city night time'
                    : service
                } --- `}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  )
}

export default TransferServiceFilter
