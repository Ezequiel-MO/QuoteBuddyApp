import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../helper/toast'
import { useCurrentProject } from '../../../../../hooks'
import { EventIntroForm } from '../../toEvent'
import { EventTransfersForm } from '../../toEvent/inputs/EventTransfersForm'

export const AddEventToSchedule = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const { addEventToSchedule } = useCurrentProject()
	const [event, setEvent] = useState(location.state.event)

	const handleAddIntro = (intro) => {
		event.introduction = [intro]
		toast.success('Introduction added', toastOptions)
	}

	const handleAddTransfer = (transferObj, selectedService, nrVehicles) => {
		const transferData = { ...transferObj, selectedService }
		const transfers = []
		for (let i = 0; i < nrVehicles; i++) {
			transfers.push(transferData)
		}
		setEvent({ ...event, transfer: transfers })
		toast.success('Transfer added', toastOptions)
	}

	/* const handleAddVenuePrices = (prices) => {
		setEvent({ ...event, venue_price: [prices] })
		toast.success('Venue prices added', toastOptions)
	} */

	const handleAddEvent = () => {
		addEventToSchedule({
			dayOfEvent: location.state.dayOfEvent,
			timeOfEvent: location.state.timeOfEvent,
			event
		})
		toast.success('Event Added to Schedule', toastOptions)
		navigate('/app/project/schedule')
	}

	return (
		<div className="grid grid-cols-2" style={{marginTop:"20px"}}>
				<EventTransfersForm handleAddTransfer={handleAddTransfer} />
		</div>
	)
}
