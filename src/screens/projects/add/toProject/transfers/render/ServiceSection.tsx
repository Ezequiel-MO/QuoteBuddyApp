import { FC } from 'react'
import { Icon } from '@iconify/react'
import { useTransfers } from './context'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * ServiceSection - Displays selected services (meet & greet, assistance, etc.)
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

	// Don't render if there are no services
	if (servicesRender.length === 0) return null

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
		<div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
			<div className="border-b border-gray-600 px-4 py-3 flex items-center">
				<Icon
					icon="mdi:account-multiple"
					className="text-white-0 mr-2"
					width="20"
				/>
				<h3 className="text-white-0 font-medium">Selected Services</h3>
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
							className="px-4 py-3 hover:bg-gray-600 transition-colors duration-200"
						>
							<div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-2">
								<div className="w-full md:w-auto flex items-center">
									<Icon
										icon={getServiceIcon(service.typeOfAssistance)}
										className="text-orange-400 mr-2"
										width="24"
									/>
									<div>
										<span className="text-gray-400 block text-sm">
											Service Type:
										</span>
										<span className="text-white-0">
											{formatServiceType(service.typeOfAssistance)}
										</span>
									</div>
								</div>

								<div className="w-full md:w-auto">
									<span className="text-gray-400 block text-sm">Vendor:</span>
									<span className="text-white-0">
										{service.freelancer?.type}
									</span>
								</div>

								<div className="w-full md:w-auto">
									<span className="text-gray-400 block text-sm">Cost:</span>
									<span className="text-white-0 font-medium">
										{formatCurrency(service.freelancer?.halfDayRate || 0)}
									</span>
								</div>

								<button
									onClick={() => handleDeletedFreelancer(index)}
									className="p-2 rounded-full text-gray-400 hover:text-white-0 hover:bg-red-500 focus:outline-none transition-colors duration-200"
									aria-label="Remove service"
								>
									<Icon icon="mdi:trash-can-outline" width="20" />
								</button>
							</div>
						</motion.li>
					))}
				</AnimatePresence>
			</ul>
		</div>
	)
}

// Define formatCurrency if it doesn't exist
const formatCurrency = (amount: number): string => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'EUR',
		minimumFractionDigits: 2
	}).format(amount)
}
