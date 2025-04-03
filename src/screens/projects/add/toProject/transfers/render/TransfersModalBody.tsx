import { FC } from 'react'
import { TransferSection } from './TransferSection'
import { ServiceSection } from './ServiceSection'
import { useTransfers } from './context'
import { Icon } from '@iconify/react'

/**
 * TransfersModalBody - Body component for the transfers modal
 * Displays selected transfers and services
 */
export const TransfersModalBody: FC = () => {
	const { state } = useTransfers()
	const { transfersIn, transfersOut, servicesIn, servicesOut } = state

	const isEmpty = (typeTransfer: 'in' | 'out') => {
		const transfers = typeTransfer === 'in' ? transfersIn : transfersOut
		const services = typeTransfer === 'in' ? servicesIn : servicesOut
		return transfers.length === 0 && services.length === 0
	}

	const showEmptyState = isEmpty('in') && isEmpty('out')

	return (
		<div
			className={
				showEmptyState ? 'space-y-6' : 'grid grid-cols-1 md:grid-cols-2 gap-6'
			}
		>
			{!showEmptyState ? (
				<>
					{/* Left column - Transfers */}
					<div className="flex flex-col h-full">
						<TransferSection />
					</div>

					{/* Right column - Services */}
					<div className="flex flex-col h-full">
						<ServiceSection />
					</div>
				</>
			) : (
				/* Empty state message */
				<div className="bg-gray-700 rounded-lg p-8 text-center col-span-2">
					<Icon
						icon="mdi:clipboard-text-outline"
						className="mx-auto text-gray-400"
						width="48"
						height="48"
					/>
					<h3 className="mt-4 text-lg font-medium text-white-0">
						No transfers configured yet
					</h3>
					<p className="mt-2 text-gray-400 max-w-md mx-auto">
						Use the selection options above to add vehicles and assistance
						services to your transfer configuration.
					</p>
				</div>
			)}
		</div>
	)
}
