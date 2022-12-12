import { useState } from 'react'
import { useCurrentProject, useGetTransferPrices } from '../../../hooks'
import Button from '../../../ui/Button'
import AddIntroToEvent from '../../projects/AddIntro/AddIntroToEvent'
import AddTransfersToEvent from '../../projects/AddTransfers/AddTransfersToEvent'
import AddVenuePricesToRestaurant from '../../restaurants/AddVenuePrices/AddVenuePricesToRestaurant'

const EventItemsTransfersAndIntro = ({
  handleAddTransfer,
  handleAddIntro,
  handleAddVenuePrices,
  handleAddEvent
}) => {
  const [company, setCompany] = useState('none')
  const [vehicleCapacity, setVehicleCapacity] = useState(0)
  const { currentProject } = useCurrentProject()
  const { groupLocation } = currentProject
  const [service, setService] = useState('')
  const [nrVehicles, setNrVehicles] = useState(1)
  const [assistance, setAssistance] = useState(0)
  const [intro, setIntro] = useState('')
  const [city] = useState(groupLocation || 'Barcelona')
  const [venuePrices, setVenuePrices] = useState({
    rental: '',
    cocktail_units: '',
    cocktail_price: '',
    catering_units: '',
    catering_price: '',
    staff_units: '',
    staff_menu_price: '',
    audiovisuals: '',
    cleaning: '',
    security: '',
    entertainment: ''
  })

  const { transfer, selectedServicePrice } = useGetTransferPrices(
    city,
    vehicleCapacity,
    company,
    service
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    handleAddIntro(intro)
    const assistanceIsNeeded = assistance > 0
    const transferObj = assistanceIsNeeded
      ? {
          ...transfer,
          assistance: +assistance,
          withAssistance: true
        }
      : transfer

    handleAddTransfer(transferObj, service, nrVehicles)
    if (handleAddVenuePrices) handleAddVenuePrices(venuePrices)
    handleAddEvent()
  }

  const AddTransfersToEventProps = {
    company,
    setCompany,
    vehicleCapacity,
    setVehicleCapacity,
    service,
    setService,
    nrVehicles,
    setNrVehicles,
    assistance,
    setAssistance,
    selectedServicePrice
  }

  return (
    <div className='flex flex-col'>
      <h1 className='text-2xl mb-4 indent-8'>Add Transfer to an Event ? </h1>
      <form onSubmit={handleSubmit} className='flex flex-col md:flex-row p-4'>
        <div className='w-full sm:w-1/2 flex flex-col'>
          <div className='flex flex-col'>
            <AddTransfersToEvent {...AddTransfersToEventProps} />
            <div>
              {handleAddVenuePrices && (
                <AddVenuePricesToRestaurant
                  venuePrices={venuePrices}
                  setVenuePrices={setVenuePrices}
                />
              )}
            </div>
          </div>
        </div>

        <div className='flex flex-col p-8 w-full md:w-1/2'>
          <AddIntroToEvent setIntro={setIntro} intro={intro} />
          <div className='mt-4'>
            <Button type='submit'>Submit choices</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EventItemsTransfersAndIntro
