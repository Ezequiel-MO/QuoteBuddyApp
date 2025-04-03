import { FC } from 'react'
import { TransferSection } from './TransferSection'
import { ServiceSection } from './ServiceSection'
import { useTransfers } from './context'
import { Icon } from '@iconify/react'

/**
 * TransfersModalBody - Body component for the transfers modal
 * Displays selected transfers and services
 * Redesigned for a more compact layout
 */
export const TransfersModalBody: FC = () => {
	const { state, typeTransfer } = useTransfers()
	const { transfersIn, transfersOut, servicesIn, servicesOut } = state

	// Get current transfers and services based on type
	const transfers = typeTransfer === 'in' ? transfersIn : transfersOut
	const services = typeTransfer === 'in' ? servicesIn : servicesOut

	// Check if there are no items to display
	const isEmpty = transfers.length === 0 && services.length === 0

	return (
		<div className="h-full">
			{!isEmpty ? (
				<div className="space-y-4">
					{/* Section header */}
					<div className="flex items-center justify-between border-b border-gray-700 pb-2">
						<h3 className="text-sm font-medium text-gray-300">
							Selected Items
						</h3>
						<div className="text-xs text-gray-400">
							{transfers.length} transfers, {services.length} services
						</div>
					</div>

					{/* Transfers section - if we have transfers */}
					{transfers.length > 0 && <TransferSection />}

					{/* Services section - if we have services */}
					{services.length > 0 && <ServiceSection />}
				</div>
			) : (
				/* Empty state message */
				<div className="flex flex-col items-center justify-center h-full text-center py-8">
					<div className="bg-gray-700 rounded-full p-3 mb-3">
						<Icon
							icon="mdi:clipboard-text-outline"
							className="text-gray-400"
							width="28"
							height="28"
						/>
					</div>
					<h3 className="text-base font-medium text-white-0">
						No items configured yet
					</h3>
					<p className="mt-1 text-sm text-gray-400 max-w-md">
						Use the options on the left to add vehicles and services.
					</p>

					{/* Quick guide */}
					<div className="mt-5 text-left bg-gray-700 rounded-lg p-3 text-xs max-w-md">
						<h4 className="text-white-0 font-medium mb-2">Quick Guide:</h4>
						<ol className="list-decimal list-inside space-y-1 text-gray-300">
							<li>Select your transport location</li>
							<li>Choose a vehicle provider and size</li>
							<li>Click "Add Transfer" to add to your list</li>
							<li>Optionally add assistance services</li>
							<li>Click "Save Data" when finished</li>
						</ol>
					</div>
				</div>
			)}
		</div>
	)
}
