import { FC } from 'react'
import { Icon } from '@iconify/react'
import { useTransfers } from './context'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * ServiceSection - Displays selected services (meet & greet, assistance, etc.)
 * Redesigned for a more compact layout
 */
export const ServiceSection: FC = () => {
	const { state, dispatch, typeTransfer } = useTransfers()
	const { servicesIn, servicesOut } = state

	// Get services based on type
	const servicesRender = typeTransfer === 'in' ? servicesIn : servicesOut

	// Handle service deletion
	const handleDeletedFreelancer = (index: number) => {
		if (typeTransfer === 'in') {
			dispatch({
				type: 'REMOVE_SERVICE_IN',
				payload: index
			})
		} else {
			dispatch({
				type: 'REMOVE_SERVICE_OUT',
				payload: index
			})
		}
	}

	// Get icon based on service type
	const getServiceIcon = (type: string) => {
		switch (type) {
			case 'meetGreet':
				return 'mdi:handshake'
			case 'hostessOnBoard':
				return 'mdi:human-greeting-variant'
			case 'guideOnBoard':
				return 'mdi:account-tie'
			default:
				return 'mdi:human-greeting'
		}
	}

	// Format service type text
	const formatServiceType = (type: string) => {
		switch (type) {
			case 'meetGreet':
				return 'Meet & Greet'
			case 'hostessOnBoard':
				return 'Hostess On Board'
			case 'guideOnBoard':
				return 'Guide On Board'
			default:
				return type
		}
	}

	return (
		<div className="bg-gray-700 rounded-lg overflow-hidden">
			<div className="border-b border-gray-600 px-3 py-2 flex items-center bg-gray-750">
				<Icon
					icon="mdi:account-multiple"
					className="text-orange-400 mr-1.5"
					width="16"
				/>
				<h3 className="text-sm font-medium text-white-0">Services</h3>
			</div>

			<ul className="divide-y divide-gray-600">
				<AnimatePresence>
					{servicesRender.map((service, index) => (
						<motion.li
							key={`service-${index}`}
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.2 }}
							className="hover:bg-gray-650 transition-colors duration-200"
						>
							<div className="px-3 py-2">
								{/* Service header with delete button */}
								<div className="flex justify-between items-center mb-1">
									<div className="flex items-center">
										<Icon
											icon={getServiceIcon(service.typeOfAssistance)}
											className="text-orange-400 mr-1.5"
											width="14"
										/>
										<span className="text-white-0 font-medium text-sm">
											{formatServiceType(service.typeOfAssistance)}
										</span>
									</div>
									<button
										onClick={() => handleDeletedFreelancer(index)}
										className="text-gray-400 hover:text-red-400 focus:outline-none transition-colors duration-200"
										aria-label="Remove service"
									>
										<Icon icon="mdi:close-circle" width="16" />
									</button>
								</div>

								{/* Service details - compact grid */}
								<div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
									<div className="text-gray-400">Provider:</div>
									<div className="text-gray-300">
										{service.freelancer?.type}
									</div>

									<div className="text-gray-400">Rate:</div>
									<div className="text-gray-300">
										€{service.freelancer?.halfDayRate}
									</div>

									{service.freelancer?.languages && (
										<>
											<div className="text-gray-400">Languages:</div>
											<div className="text-gray-300">
												{service.freelancer?.languages}
											</div>
										</>
									)}
								</div>
							</div>
						</motion.li>
					))}
				</AnimatePresence>
			</ul>
		</div>
	)
}
