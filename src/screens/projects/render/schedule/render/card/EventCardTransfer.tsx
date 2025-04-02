import React, { useState, useEffect, useRef, FC } from 'react'
import { IEvent, IRestaurant } from '../../../../../../interfaces'
import { useCurrentProject } from '../../../../../../hooks'
import { TransfersProvider } from '../../../../add/toProject/transfers/render/context'
import { ModalAddEvent } from '../../../../add/toSchedule/addModalEvent/ModalAddEvent'
import { DeleteIcon } from '@components/atoms'
import { ServiceKey } from 'src/interfaces'

interface EventCardTransferProps {
	event: IEvent | IRestaurant
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	typeEvent: 'morningEvents' | 'afternoonEvents' | 'lunch' | 'dinner'
	dayIndex: number
	setChange: React.Dispatch<React.SetStateAction<boolean>>
	openModalVenue?: boolean
}

export const EventCardTransfer: FC<EventCardTransferProps> = ({
	event,
	open,
	setOpen,
	typeEvent,
	dayIndex,
	setChange,
	openModalVenue
}) => {
	const ref = useRef<HTMLDivElement | null>(null)
	const { editTransferEventOrRestaurant } = useCurrentProject()
	const [show, setShow] = useState(false)
	const [openModal, setOpenModal] = useState(false)

	useEffect(() => {
		if (open) {
			setTimeout(() => {
				setShow(true)
			}, 400)
		} else {
			setShow(false)
		}
	}, [open])

	const handleClickOutside = (e: MouseEvent) => {
		if (ref.current && !ref.current.contains(e.target as Node) && open) {
			const includesTypes = ['HTML', 'ABBR', 'svg', 'path', 'BUTTON']
			if (includesTypes.includes((e.target as HTMLElement).nodeName)) {
				return
			}
			setOpen(false)
		}
	}

	useEffect(() => {
		if (!openModal && !openModalVenue) {
			document.addEventListener('mousedown', handleClickOutside)
			return () => {
				document.removeEventListener('mousedown', handleClickOutside)
			}
		}
	}, [open, openModal, openModalVenue])

	const handleDelete = (indexTransfer: number) => {
		const idEvent = event._id
		let transfersFilter
		if (event.transfer) {
			transfersFilter = event.transfer.filter(
				(_, index) => index !== indexTransfer
			)
		}
		editTransferEventOrRestaurant({
			typeEvent: typeEvent,
			dayIndex: dayIndex as number,
			idEvent,
			transferEdit: transfersFilter
		})
	}

	if (!event.transfer || event.transfer.length === 0 || !open) return null

	return (
		<>
			<TransfersProvider>
				<ModalAddEvent
					event={event}
					open={openModal}
					setOpen={setOpenModal}
					update={true}
					dayIndex={dayIndex}
					typeEvent={typeEvent}
				/>
				<div
					ref={ref}
					className={`
            mt-2 overflow-hidden bg-gradient-to-b from-gray-700 to-gray-800
            rounded-md shadow-lg border border-gray-600
            transition-all duration-500 ease-in-out
            ${show ? 'opacity-100 max-h-[400px]' : 'opacity-0 max-h-0'}
          `}
					onClick={(e) => {
						e.stopPropagation()
						setTimeout(() => {
							setOpenModal(true)
						}, 200)
					}}
				>
					{/* Simplified header with edit cue */}
					<div className="px-3 py-2 bg-gray-800/80 flex justify-between items-center border-b border-gray-700">
						<span className="text-sm font-medium text-white-0">Transfers</span>
						<span className="text-xs text-cyan-400">(Click to edit)</span>
					</div>

					{/* Body with compact layout */}
					<div className="px-3 py-2">
						{show &&
							event.transfer &&
							event.transfer.map(({ _id, selectedService, ...el }, index) => {
								const serviceKey = selectedService as ServiceKey
								const price = el[serviceKey]

								return (
									<div
										key={index}
										className="py-2 border-b border-gray-700 last:border-0"
									>
										<div className="flex justify-between items-center">
											<div className="flex items-center text-sm">
												<span className="text-white-0">
													{el.vehicleCapacity} Seater
												</span>
												<span className="mx-1.5 text-gray-500">|</span>
												<span className="text-gray-300">{selectedService}</span>
											</div>
											<DeleteIcon
												id={_id || `transfer-${index}`}
												onDelete={() => handleDelete(index)}
											/>
										</div>

										{/* Show assistance info if applicable */}
										{index === 0 && el.assistance > 0 && (
											<div className="mt-1.5 text-xs text-gray-300 bg-gray-800/50 p-1.5 rounded">
												<div className="flex items-center">
													<span>
														Assistance: <strong>{el.assistance} Unit/s</strong>{' '}
														- Cost: <strong>{el.assistanceCost} EUR</strong>
													</span>
												</div>
											</div>
										)}
									</div>
								)
							})}
					</div>
				</div>
			</TransfersProvider>
		</>
	)
}
