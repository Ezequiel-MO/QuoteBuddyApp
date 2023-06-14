import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../helper/toast'
import { useCurrentProject } from '../../../../../hooks'
import { EventTransfersForm } from '../../toEvent/inputs/EventTransfersForm'

export const AddEventToSchedule = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const { addEventToSchedule } = useCurrentProject()
	const [event, setEvent] = useState(location.state.event)
	

	const handleAddTransfer = (transferObj, selectedService, nrVehicles) => {
		const transferData = { ...transferObj, selectedService }
		const transfers = []
		for (let i = 0; i < nrVehicles; i++) {
			transfers.push(transferData)
		}
		let addEvent = {}
		setEvent(currentEvent => {
			const newEvent = { ...currentEvent, transfer: transfers }
			addEvent = newEvent
			return newEvent
		});
		if (addEvent?.transfer && addEvent?.transfer.length > 0) {
			toast.success('Transfer added', toastOptions)
		}
		setTimeout(() => {
			addEventToSchedule({
				dayOfEvent: location.state.dayOfEvent,
				timeOfEvent: location.state.timeOfEvent,
				event: addEvent
			})
			toast.success('Event Added to Schedule', toastOptions)
			navigate('/app/project/schedule')
		}, 1000)
	}


	return (
		<div className="grid grid-cols-2" style={{ marginTop: "20px" }}>
			<EventTransfersForm handleAddTransfer={handleAddTransfer} />
		</div>
	)
}
