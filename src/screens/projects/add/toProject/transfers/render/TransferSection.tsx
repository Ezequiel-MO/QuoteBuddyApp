import { FC, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useTransfers } from './context'
import { motion, AnimatePresence } from 'framer-motion'
import { useCurrentProject } from '@hooks/index'
import { ITransfer } from '@interfaces/transfer'

/**
 * TransferSection - Displays selected transfers
 * Redesigned for a more compact layout
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

	return (
		<div className="bg-gray-700 rounded-lg overflow-hidden">
			<div className="border-b border-gray-600 px-3 py-2 flex items-center bg-gray-750">
				<Icon icon="mdi:car" className="text-orange-400 mr-1.5" width="16" />
				<h3 className="text-sm font-medium text-white-0">Transfers</h3>
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
							className="hover:bg-gray-650 transition-colors duration-200"
						>
							<div className="px-3 py-2">
								{/* Transfer header with delete button */}
								<div className="flex justify-between items-center mb-1">
									<div className="flex items-center">
										<span className="text-white-0 font-medium text-sm">
											{transfer.vehicleCapacity} seater
										</span>
										<span className="mx-1.5 text-gray-500">•</span>
										<span className="text-gray-300 text-sm">
											{transfer.company}
										</span>
									</div>
									<button
										onClick={() => handleDeletedTransfer(index)}
										className="text-gray-400 hover:text-red-400 focus:outline-none transition-colors duration-200"
										aria-label="Remove transfer"
									>
										<Icon icon="mdi:close-circle" width="16" />
									</button>
								</div>

								{/* Transfer details - compact grid */}
								<div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
									<div className="text-gray-400">Type:</div>
									<div className="text-gray-300">Transfer {typeTransfer}</div>

									{transfer.vehicleType && (
										<>
											<div className="text-gray-400">Vehicle:</div>
											<div className="text-gray-300">
												{transfer.vehicleType}
											</div>
										</>
									)}

									{typeTransfer === 'in' &&
										transfer.transfer_in !== undefined && (
											<>
												<div className="text-gray-400">Cost:</div>
												<div className="text-gray-300">
													{transfer.transfer_in} EUR
												</div>
											</>
										)}

									{typeTransfer === 'out' &&
										transfer.transfer_out !== undefined && (
											<>
												<div className="text-gray-400">Cost:</div>
												<div className="text-gray-300">
													{transfer.transfer_out} EUR
												</div>
											</>
										)}

									{transfer.assistance > 0 && (
										<>
											<div className="text-gray-400">Assistance:</div>
											<div className="text-gray-300">
												{transfer.assistance} units
											</div>
										</>
									)}

									{transfer.meetGreet > 0 && (
										<>
											<div className="text-gray-400">Meet & Greet:</div>
											<div className="text-gray-300">
												{transfer.meetGreet} units
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
