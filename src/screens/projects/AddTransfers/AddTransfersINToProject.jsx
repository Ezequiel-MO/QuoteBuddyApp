import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import accounting from 'accounting'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../helper/toast'
import { useCurrentProject, useGetTransferPrices } from '../../../hooks'
import { TransferVendorFilter, VehicleSizeFilter } from '../../../ui/filters'

const AddTransfersINToProject = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { currentProject, addEventToSchedule } = useCurrentProject()
  const { groupLocation } = currentProject
  const [company, setCompany] = useState('')
  const [nrVehicles, setNrVehicles] = useState(1)
  const [assistance, setAssistance] = useState(0)
  const [meetGreet, setMeetGreet] = useState(0)
  const [vehicleCapacity, setVehicleCapacity] = useState(0)
  const [city] = useState(groupLocation || 'Barcelona')

  const { transferInPrice, transfer } = useGetTransferPrices(
    city,
    vehicleCapacity,
    company
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    const assistanceNeeded = assistance > 0 || meetGreet > 0
    const transfer_in = assistanceNeeded
      ? {
          ...transfer,
          assistance: +assistance,
          meetGreet: +meetGreet,
          withAssistance: true
        }
      : transfer

    for (let i = 0; i < nrVehicles; i++) {
      addEventToSchedule({
        dayOfEvent: state.dayOfEvent,
        timeOfEvent: state.timeOfEvent,
        event: transfer_in
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
          @ unit cost of {accounting.formatMoney(transferInPrice, '€')}
        </span>
        <span className='mx-2 font-bold'>
          TOTAL {accounting.formatMoney(nrVehicles * transferInPrice, '€')}
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

        <div className='flex flex-row justify-start my-1'>
          <label className='text-xl text-gray-100 mr-10' htmlFor='nrVehicles'>
            Number of Vehicles{' '}
          </label>
          <input
            type='number'
            name='nrVehicles'
            value={nrVehicles}
            onChange={(e) => setNrVehicles(e.target.value)}
            className='px-2 py-1 border-0 rounded-xl bg-green-50 text-center cursor-pointer w-20'
          />
        </div>
        <div className='flex flex-row justify-start my-1'>
          <label className='text-xl text-gray-100 mr-2' htmlFor='meetGreet'>
            Meet&Greet cost (if any)
          </label>
          <input
            type='number'
            name='meetGreet'
            value={meetGreet}
            onChange={(e) => setMeetGreet(e.target.value)}
            className='px-2 py-1 border-0 rounded-xl bg-green-50 text-center cursor-pointer w-20'
          />
        </div>
        <div className='flex flex-row justify-start my-1'>
          <label className='text-xl text-gray-100 mr-1' htmlFor='assistance'>
            Transfer Assistance cost
          </label>
          <input
            type='number'
            name='assistance'
            value={assistance}
            onChange={(e) => setAssistance(e.target.value)}
            className='px-2 py-1 border-0 rounded-xl bg-green-50 text-center cursor-pointer w-20'
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

export default AddTransfersINToProject
