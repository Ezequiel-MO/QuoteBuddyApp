import { FC, useState } from 'react'
import { IEvent, IRestaurant } from '../../../../../../interfaces'
import { TransfersProvider } from '../../../../add/toProject/transfers/render/context'
import { ModalAddEvent } from '../../../../add/toSchedule/addModalEvent/ModalAddEvent'

interface IconTransferProps {
	event: IEvent | IRestaurant
	typeEvent: 'morningEvents' | 'afternoonEvents' | 'lunch' | 'dinner'

	dayIndex?: number
}
const deletedIcon =
	'hover:text-orange-500 hover:scale-110 hover:transition hover:duration-150 hover:ease-in-out '

export const IconTransfer: FC<IconTransferProps> = ({
	event,
	dayIndex,
	typeEvent
}) => {
	const [openModal, setOpenModal] = useState(false)

	if (event?.transfer && event?.transfer.length === 0) {
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
					<span
						role="button"
						className={deletedIcon}
						style={{
							color: 'white',
							fontSize: '15px',
							display: 'inline-block'
						}}
						onClick={(e) => {
							e.stopPropagation()
							setOpenModal(true)
						}}
					>
						Add Transfers
					</span>
				</TransfersProvider>
			</>
		)
	}

	return null
}
