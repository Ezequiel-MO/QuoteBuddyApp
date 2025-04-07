import { useState, useEffect, FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { TransfersHeader } from './TransfersHeader'
import { TransferSection } from './TransferSection'
import { ServiceSection } from './ServiceSection'
import { transfersIncludedAssistance } from './helperAndHandles'
import {
	ModalComponent,
	ModalCancelButton,
	Spinner
} from '../../../../../components/atoms'
import { useCurrentProject } from '../../../../../hooks'
import { useTransfers } from '../../toProject/transfers/render/context'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../helper/toast'

interface ModalAddEventProps {
	open: boolean
	setOpen: (value: boolean) => void
	event: any
	update?: boolean
	dayIndex?: number
	typeEvent: 'morningEvents' | 'afternoonEvents' | 'lunch' | 'dinner'
}

export const ModalAddEvent: FC<ModalAddEventProps> = ({
	open,
	setOpen,
	event,
	update = false,
	dayIndex,
	typeEvent
}) => {
	const location = useLocation()
	const navigate = useNavigate()
	const { currentProject, addEventToSchedule, editTransferEventOrRestaurant } =
		useCurrentProject()
	const {
		setCity,
		state,
		dispatch,
		setCompany,
		setVehicleCapacity,
		setService,
		setEvent
	} = useTransfers()
	const { groupLocation } = currentProject
	const { transferEvent, servicesEvent } = state
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		setCity(groupLocation)
		setEvent(event)
		setTimeout(() => setLoading(false), 1200)
	}, [groupLocation, open])

	const handleClose = () => {
		setCompany('')
		setVehicleCapacity('')
		setService('')
		dispatch({ type: 'RESET_TRANSFER_EVENT' })
		setOpen(false)
	}

	const handleSubmit = async () => {
		setLoading(true)
		const updatedTransfers = transfersIncludedAssistance(
			servicesEvent,
			transferEvent
		)
		try {
			if (!update) {
				event.transfer = updatedTransfers
				addEventToSchedule({
					event,
					dayOfEvent: location.state.dayOfEvent,
					timeOfEvent: location.state.timeOfEvent
				})
			} else {
				editTransferEventOrRestaurant({
					typeEvent,
					dayIndex: dayIndex as number,
					idEvent: event._id,
					transferEdit: updatedTransfers
				})
			}
			toast.success(
				!update ? 'Event Added to Schedule' : 'Save edit transfer',
				toastOptions
			)
			setOpen(false)
			setTimeout(() => navigate('/app/project/schedule'), 600)
		} catch (err) {
			console.log(err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<ModalComponent
			open={open}
			setOpen={handleClose}
			styleModal={{
				position: 'fixed',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				width: '80%',
				height: '90%',
				backgroundColor: 'transparent',
				boxShadow: 'none',
				padding: 0,
				margin: 0,
				overflow: 'hidden',
				outline: 'none',
				border: 'none'
			}}
		>
			<div className="rounded-lg shadow-xl overflow-hidden bg-gray-800 max-h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex flex-col">
				{loading ? (
					<div className="flex items-center justify-center h-full">
						<Spinner />
					</div>
				) : (
					<>
						{/* Header */}
						<div className="bg-gray-900 py-2 px-4 flex justify-between items-center border-b border-gray-700 shrink-0">
							<h2 className="text-lg font-semibold text-white-0">
								Configure Transfers
							</h2>
							<ModalCancelButton handleClose={handleClose} />
						</div>

						{/* Content */}
						<div className="flex flex-1 overflow-hidden">
							<div className="w-1/3 border-r border-gray-700 bg-gray-850 overflow-y-auto p-3 custom-scrollbar">
								<TransfersHeader />
							</div>
							<div className="w-2/3 overflow-y-auto p-3 custom-scrollbar">
								<TransferSection />
								<ServiceSection />
							</div>
						</div>

						{/* Footer */}
						<div className="bg-gray-900 py-2 px-4 border-t border-gray-700 flex justify-end shrink-0">
							<button
								className="bg-gray-600 text-white px-4 py-1.5 rounded mr-3 hover:bg-gray-500 transition-colors duration-200 text-sm"
								onClick={handleClose}
							>
								Cancel
							</button>
							<button
								className={`bg-orange-500 text-white px-6 py-1.5 rounded hover:bg-orange-600 transition-colors duration-200 text-sm ${
									loading ? 'opacity-75 cursor-not-allowed' : ''
								}`}
								onClick={handleSubmit}
								disabled={loading}
							>
								{loading ? 'Saving...' : 'Save Data'}
							</button>
						</div>
					</>
				)}
			</div>
		</ModalComponent>
	)
}
