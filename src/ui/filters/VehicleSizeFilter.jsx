import { useState, useEffect } from 'react'
import baseAPI from '../../axios/axiosConfig'

const VehicleSizeFilter = ({
  company,
  vehicleCapacity,
  setVehicleCapacity
}) => {
  const [options, setOptions] = useState(
    /*   JSON.parse(localStorage.getItem("vehicleSizes")) ||  */ []
  )
  useEffect(() => {
    const getVehicleSizesByCompany = async () => {
      try {
        const response = await baseAPI.get(`v1/transfers?company=${company}`)
        const vehicleSizes = response.data.data.data.map(
          (transfer) => transfer.vehicleCapacity
        )
        const uniqueVehicleSizes = [...new Set(vehicleSizes)]
        /* localStorage.setItem(
          "vehicleSizes",
          JSON.stringify(uniqueVehicleSizes)
        ); */
        setOptions(uniqueVehicleSizes)
      } catch (error) {
        console.log(error)
      }
    }

    if (company) {
      getVehicleSizesByCompany()
    }
  }, [company])

  return (
    <div className='w-60 max-w-sm my-2 ml-0 mr-0'>
      <div className='flex items-center gap-2'>
        <select
          id='vehicleSize'
          value={vehicleCapacity}
          className='flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer'
          onChange={(e) => setVehicleCapacity(e.target.value)}
        >
          <option value={0}>--- Filter by Vehicle Size ---</option>
          {options.map((vehicleSize) => (
            <option key={vehicleSize} value={vehicleSize}>
              {` --- ${vehicleSize} seater ${
                vehicleSize <= 3
                  ? 'Sedan Car'
                  : vehicleSize === 6
                  ? 'Mini Van'
                  : vehicleSize === 20
                  ? 'Mini Bus'
                  : 'Bus'
              }--- `}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default VehicleSizeFilter
