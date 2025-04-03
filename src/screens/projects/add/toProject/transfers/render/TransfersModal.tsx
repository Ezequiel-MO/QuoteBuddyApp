import { FC, useEffect, useState } from 'react'
import { useTransfers } from './context'
import { couterMeetGreetAndAssistance } from './helper'
import { TransfersModalHeader } from './TransfersModalHeader'
import { TransfersModalBody } from './TransfersModalBody'
import { motion } from 'framer-motion'
import { useCurrentProject } from '@hooks/index'
import { ITransfer } from '@interfaces/transfer'
import { ModalCancelButton, ModalComponent } from '@components/atoms'

/**
 * TransfersModal - Modal for configuring transfer settings
 *
 * @param newTypeTransfer - Type of transfer ('in' for arrival or 'out' for departure)
 */
interface TransfersModalProps {
	newTypeTransfer: 'in' | 'out'
}

export const TransfersModal: FC<TransfersModalProps> = ({
	newTypeTransfer
}) => {
	// Access context and state
	const {
		open,
		setOpen,
		state,
		typeTransfer,
		setTypeTransfer,
		dispatch,
		setSelectedSection
	} = useTransfers()

	const { transfersIn, servicesIn, servicesOut, transfersOut } = state
	const { addTransferToSchedule, currentProject } = useCurrentProject()
	const [prevTransfers, setPrevTransfers] = useState<ITransfer[]>([])
	const [isSaving, setIsSaving] = useState(false)

	// Initialize component with transfer type and sync with Redux state
	useEffect(() => {
		console.log('TransfersModal initialized with type:', newTypeTransfer)
		setTypeTransfer(newTypeTransfer)

		// Sync with Redux state
		if (
			newTypeTransfer === 'in' &&
			currentProject?.schedule?.[0]?.transfer_in
		) {
			const projectTransfersIn = currentProject.schedule[0].transfer_in

			// Only update if different from current state to prevent loops
			if (JSON.stringify(projectTransfersIn) !== JSON.stringify(transfersIn)) {
				console.log('Syncing transfers in from Redux:', projectTransfersIn)
				dispatch({
					type: 'UPDATE_TRANSFER_IN',
					payload: { transferObject: projectTransfersIn }
				})
			}
			setPrevTransfers(projectTransfersIn)
		} else if (
			newTypeTransfer === 'out' &&
			currentProject?.schedule?.length > 0
		) {
			const lastIndex = currentProject.schedule.length - 1
			const projectTransfersOut =
				currentProject.schedule[lastIndex]?.transfer_out || []

			// Only update if different from current state to prevent loops
			if (
				JSON.stringify(projectTransfersOut) !== JSON.stringify(transfersOut)
			) {
				console.log('Syncing transfers out from Redux:', projectTransfersOut)
				dispatch({
					type: 'UPDATE_TRANSFER_OUT',
					payload: { transferObject: projectTransfersOut }
				})
			}
			setPrevTransfers(projectTransfersOut)
		}
	}, [newTypeTransfer, setTypeTransfer, currentProject, dispatch])

	/**
	 * Handle modal close
	 * Restores previous transfers if changes were not saved
	 */
	const handleClose = () => {
		if (typeTransfer === 'in') {
			dispatch({
				type: 'UPDATE_TRANSFER_IN',
				payload: { transferObject: prevTransfers }
			})
		} else {
			dispatch({
				type: 'UPDATE_TRANSFER_OUT',
				payload: { transferObject: prevTransfers }
			})
		}

		// Reset selected section and close the modal
		setSelectedSection(null)
		setOpen(false)
	}

	/**
	 * Save transfer data
	 * Processes both transfers and services, then adds them to schedule
	 */
	const saveData = () => {
		setIsSaving(true)

		const transfers = typeTransfer === 'in' ? transfersIn : transfersOut
		const services = typeTransfer === 'in' ? servicesIn : servicesOut

		// Get meet & greet and assistance counts from selected services
		const { assistanceCount, meetGreetCount } =
			couterMeetGreetAndAssistance(services)

		// Helper function to determine if it's the last iteration
		const isLastIteration = (index: number, length: number) =>
			index === length - 1

		// Update transfers with service information
		const updatedTransfers = transfers.map((transfer) => {
			let updatedTransfer = { ...transfer }

			services.forEach((service, serviceIndex) => {
				const { typeOfAssistance, freelancer } = service
				const { halfDayRate } = freelancer

				// Apply meet & greet costs
				if (service.typeOfAssistance === 'meetGreet') {
					updatedTransfer.meetGreetCost = halfDayRate
				}

				// Apply assistance costs
				if (['hostessOnBoard', 'guideOnBoard'].includes(typeOfAssistance)) {
					updatedTransfer.assistanceCost = halfDayRate
				}

				// Set counts on the last iteration
				if (isLastIteration(serviceIndex, services.length)) {
					if (meetGreetCount > 0) {
						updatedTransfer.meetGreet = meetGreetCount
					}
					if (assistanceCount > 0) {
						updatedTransfer.assistance = assistanceCount
					}
				}
			})

			return updatedTransfer
		})

		// Add transfers to schedule based on type
		if (typeTransfer === 'in') {
			addTransferToSchedule('transfer_in', updatedTransfers)
		} else {
			addTransferToSchedule('transfer_out', updatedTransfers)
		}

		// Close modal after a brief delay to show saving state
		setTimeout(() => {
			setIsSaving(false)
			setOpen(false)
		}, 300)
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
				width: '85%',
				height: '90%',
				maxWidth: '1200px',
				backgroundColor: 'transparent',
				boxShadow: 'none',
				padding: 0,
				margin: 0,
				overflow: 'hidden',
				outline: 'none',
				border: 'none'
			}}
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				className="rounded-lg shadow-xl overflow-hidden bg-gray-800 max-h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex flex-col"
			>
				{/* Header with title and close button */}
				<div className="bg-gray-900 py-2 px-4 flex justify-between items-center border-b border-gray-700 shrink-0">
					<h2 className="text-lg font-semibold text-white-0">
						Configure Transfers {typeTransfer === 'in' ? 'In' : 'Out'}
					</h2>
					<ModalCancelButton handleClose={handleClose} />
				</div>

				{/* Content area with flex layout for better space utilization */}
				<div className="flex flex-1 overflow-hidden modal-content-responsive">
					{/* Left sidebar with selection controls - compact width */}
					<div className="w-1/3 border-r border-gray-700 bg-gray-850 overflow-y-auto p-3 custom-scrollbar modal-sidebar-responsive">
						<TransfersModalHeader />
					</div>

					{/* Main content area for showing selections */}
					<div className="w-2/3 overflow-y-auto p-3 custom-scrollbar modal-main-responsive">
						<TransfersModalBody />
					</div>
				</div>

				{/* Footer with action buttons */}
				<div className="bg-gray-900 py-2 px-4 border-t border-gray-700 flex justify-end shrink-0">
					<button
						className="bg-gray-600 text-white-0 px-4 py-1.5 rounded mr-3 hover:bg-gray-500 transition-colors duration-200 text-sm"
						onClick={handleClose}
					>
						Cancel
					</button>
					<button
						className={`bg-orange-500 text-white-0 px-6 py-1.5 rounded hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center text-sm ${
							isSaving ? 'opacity-75 cursor-not-allowed' : ''
						}`}
						onClick={saveData}
						disabled={isSaving}
					>
						{isSaving ? (
							<>
								<svg
									className="animate-spin -ml-1 mr-2 h-4 w-4 text-white-0"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								Saving...
							</>
						) : (
							'Save Data'
						)}
					</button>
				</div>
			</motion.div>
		</ModalComponent>
	)
}
