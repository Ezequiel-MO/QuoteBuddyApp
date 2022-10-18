import accounting from 'accounting'
import { useState } from 'react'
import { useCurrentProject } from '../../../hooks/useCurrentProject'
import {
  TransferServiceFilter,
  TransferVendorFilter,
  VehicleSizeFilter
} from '../../../ui/filters'

const AddTransfersToEvent = ({
  company,
  setCompany,
  vehicleCapacity,
  setVehicleCapacity,
  service,
  setService,
  nrVehicles,
  setNrVehicles,
  selectedServicePrice
}) => {
  const { currentProject } = useCurrentProject()
  const [city, setCity] = useState(currentProject.groupLocation || 'Barcelona')
  return (
    <div>
      <p className='text-white-100 text-xl text-center'>
        {`${nrVehicles}  x ${vehicleCapacity} seater vehicle(s)
      `}
        <span className='ml-2'>
          @ unit cost of {accounting.formatMoney(selectedServicePrice, '€')}
        </span>
        <span className='mx-2 font-bold'>
          TOTAL {accounting.formatMoney(nrVehicles * selectedServicePrice, '€')}
        </span>
      </p>
      <div>
        <TransferVendorFilter
          setCompany={setCompany}
          company={company}
          city={city}
        />
        <VehicleSizeFilter
          company={company}
          vehicleCapacity={vehicleCapacity}
          setVehicleCapacity={setVehicleCapacity}
        />
        <TransferServiceFilter
          company={company}
          vehicleCapacity={vehicleCapacity}
          service={service}
          setService={setService}
        />
        <div className='flex flex-row justify-start my-1'>
          <label className='text-xl text-gray-100 mr-1' htmlFor='nrVehicles'>
            Number of Vehicles{' '}
          </label>
          <input
            type='number'
            name='nrVehicles'
            value={nrVehicles}
            onChange={(e) => setNrVehicles(e.target.value)}
            className='py-1 border-0 rounded-xl bg-green-50 text-center cursor-pointer'
          />
        </div>
      </div>
    </div>
  )
}

export default AddTransfersToEvent
