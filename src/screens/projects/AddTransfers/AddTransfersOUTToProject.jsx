import accounting from 'accounting'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../helper/toast'
import { useCurrentProject } from '../../../hooks/useCurrentProject'
import { TransferVendorFilter, VehicleSizeFilter } from '../../../ui/filters'
import useGetTransferPrices from '../../../hooks/useGetTransferPrices'

const AddTransfersOUTToProject = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { currentProject, addEventToSchedule } = useCurrentProject()
  const { groupLocation } = currentProject
  const [company, setCompany] = useState('')
  const [nrVehicles, setNrVehicles] = useState(1)
  const [vehicleCapacity, setVehicleCapacity] = useState(0)
  const [city] = useState(groupLocation || 'Barcelona')

  const { transferOutPrice, transfer } = useGetTransferPrices(
    city,
    vehicleCapacity,
    company
  )

  console.log('transferOutPrice', transfer, transferOutPrice)

  const handleSubmit = (e) => {
    e.preventDefault()
    for (let i = 0; i < nrVehicles; i++) {
      addEventToSchedule({
        dayOfEvent: state.dayOfEvent,
        timeOfEvent: state.timeOfEvent,
        event: transfer
      })
    }

    toast.success('Transfer/s added', toastOptions)
    navigate('/app/project/schedule')
  }

  return (
    <form onSubmit={handleSubmit} className='w-1/2 flex flex-col p-8'>
      <p className='text-white-100 text-xl text-center'>
        {`${nrVehicles}  x ${vehicleCapacity} seater vehicle(s)
      `}
        <span className='ml-2'>
          @ unit cost of {accounting.formatMoney(transferOutPrice, '€')}
        </span>
        <span className='mx-2 font-bold'>
          TOTAL {accounting.formatMoney(nrVehicles * transferOutPrice, '€')}
        </span>
      </p>
      <div className='flex flex-col mt-2'>
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

        <div className='flex flex-row justify-between my-1'>
          <label className='text-xl text-gray-100' htmlFor='nrVehicles'>
            Number of Vehicles{' '}
          </label>
          <input
            type='number'
            name='nrVehicles'
            value={nrVehicles}
            onChange={(e) => setNrVehicles(e.target.value)}
            className='px-2 py-1 border-0 rounded-xl bg-green-50 text-center cursor-pointer'
          />
        </div>
        <input
          className='text-xl text-gray-100 cursor-pointer mt-20'
          type='submit'
          value='Submit choices'
        />
      </div>
    </form>
  )
}

export default AddTransfersOUTToProject
