import { FC, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useTransfers } from './context'
import { motion, AnimatePresence } from 'framer-motion'
import { useCurrentProject } from '@hooks/index'
import { ITransfer } from '@interfaces/transfer'

/**
 * TransferSection - Displays selected transfers
 */
export const TransferSection: FC = () => {
	const { state, dispatch, typeTransfer } = useTransfers()
	const { transfersIn, transfersOut } = state
	const { currentProject } = useCurrentProject()

	// Get transfers based on type
	const transfersRender = typeTransfer === 'in' ? transfersIn : transfersOut

	// Load transfers from project on first render
	useEffect(() => {
		if (typeTransfer === 'in' && transfersRender.length === 0) {
			const transfersInProject: ITransfer[] =
				currentProject?.schedule[0]?.transfer_in || []
			if (transfersInProject.length > 0) {
				dispatch({
					type: 'UPDATE_TRANSFER_IN',
					payload: { transferObject: transfersInProject }
				})
			}
		}

		if (typeTransfer === 'out' && transfersRender.length === 0) {
			const lastIndex = (currentProject?.schedule.length || 1) - 1
			const transfersOutProject: ITransfer[] =
				currentProject?.schedule[lastIndex]?.transfer_out || []
			if (transfersOutProject.length > 0) {
				dispatch({
					type: 'UPDATE_TRANSFER_OUT',
					payload: { transferObject: transfersOutProject }
				})
			}
		}
	}, [typeTransfer, currentProject, dispatch, transfersRender.length])

	// Handle transfer deletion
	const handleDeletedTransfer = (index: number) => {
		if (typeTransfer === 'in') {
			dispatch({
				type: 'REMOVE_TRANSFER_IN',
				payload: index
			})
		} else {
			dispatch({
				type: 'REMOVE_TRANSFER_OUT',
				payload: index
			})
		}
	}

	// Don't render if there are no transfers
	if (transfersRender.length === 0) return null

	return (
		<div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
			<div className="border-b border-gray-600 px-4 py-3 flex items-center">
				<Icon icon="mdi:car" className="text-white-0 mr-2" width="20" />
				<h3 className="text-white-0 font-medium">Selected Transfers</h3>
			</div>

			<ul className="divide-y divide-gray-600">
				<AnimatePresence>
					{transfersRender.map((transfer, index) => (
						<motion.li
							key={`${transfer._id || index}`}
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.2 }}
							className="px-4 py-3 hover:bg-gray-600 transition-colors duration-200"
						>
							<div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-2">
								<div className="w-full md:w-auto">
									<span className="text-gray-400 block text-sm">Vendor:</span>
									<span className="text-white-0">{transfer.company}</span>
								</div>

								<div className="w-full md:w-auto">
									<span className="text-gray-400 block text-sm">
										Vehicle Size:
									</span>
									<span className="text-white-0">
										{transfer.vehicleCapacity} seater
									</span>
								</div>

								<div className="w-full md:w-auto">
									<span className="text-gray-400 block text-sm">Type:</span>
									<span className="text-white-0">Transfer {typeTransfer}</span>
								</div>

								<button
									onClick={() => handleDeletedTransfer(index)}
									className="p-2 rounded-full text-gray-400 hover:text-white-0 hover:bg-red-500 focus:outline-none transition-colors duration-200"
									aria-label="Remove transfer"
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
