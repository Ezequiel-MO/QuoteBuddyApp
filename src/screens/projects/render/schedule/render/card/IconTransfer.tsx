import { FC, useState } from 'react'
import { Icon } from '@iconify/react'
import { IEvent, IRestaurant } from '../../../../../../interfaces'
import { TransfersProvider } from '../../../../add/toProject/transfers/render/context'
import { ModalAddEvent } from '../../../../add/toSchedule/addModalEvent/ModalAddEvent'

interface IconTransferProps {
	event: IEvent | IRestaurant
	typeEvent: 'morningEvents' | 'afternoonEvents' | 'lunch' | 'dinner'
	dayIndex?: number
}

export const IconTransfer: FC<IconTransferProps> = ({
	event,
	dayIndex,
	typeEvent
}) => {
	const [openModal, setOpenModal] = useState(false)
	const hasNoTransfers = event?.transfer && event?.transfer.length === 0

	if (!hasNoTransfers) {
		return null
	}

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
				<button
					type="button"
					className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-700 hover:bg-gray-600 text-white-0 transition-colors duration-200 shadow-sm border border-gray-600 mt-1 text-sm"
					onClick={(e) => {
						e.stopPropagation()
						setOpenModal(true)
					}}
				>
					<Icon
						icon="fluent:vehicle-car-24-regular"
						className="mr-1.5 text-cyan-400"
					/>
					<span className="font-medium">Add Transfers</span>
				</button>
			</TransfersProvider>
		</>
	)
}
