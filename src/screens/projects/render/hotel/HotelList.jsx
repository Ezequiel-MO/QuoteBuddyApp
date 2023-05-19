import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { HotelModal } from './hotelModal/HotelModal'
import { useCurrentProject } from '../../../../hooks'
import styles from '../DayEvents.module.css'
import { CardAddButton } from '../../../../components/atoms/CardAddButton'

export const HotelList = ({ hotels, onDelete }) => {
	const navigate = useNavigate()
	const [open, setOpen] = useState(false)
	const [hotelModal, setHotelModal] = useState()
	const [hotelIndexModal, setIndexHotelModal] = useState()

	const { dragAndDropHotel } = useCurrentProject()

	const handleDragStart = (e, index) => {
		e.dataTransfer.setData('hotelIndex', index)
	}

	const handleDrop = (e, index) => {
		e.preventDefault()
		const startHotelIndex = e.dataTransfer.getData('hotelIndex')
		dragAndDropHotel({
			startHotelIndex: Number(startHotelIndex),
			endHotelIndex: index
		})
	}

	const handleDragOver = (e) => {
		e.preventDefault()
	}

	const handleClick = (e, hotel, index) => {
		setHotelModal(hotel)
		setIndexHotelModal(index)
		setOpen(true)
	}

	if (hotels.length === 0) {
		return (
			<div className={styles.hotels}>
				<CardAddButton navigate={navigate} />
			</div>
		)
	}

	return (
		<div className={styles.hotels}>
			<HotelModal
				open={open}
				setOpen={setOpen}
				hotel={hotelModal}
				index={hotelIndexModal}
			/>

			{hotels.map((hotel, index) => (
				<>
					<div
						className={styles.hotel}
						key={hotel._id}
						draggable
						onDragStart={(e) => handleDragStart(e, index)}
						onDragOver={handleDragOver}
						onDrop={(e) => handleDrop(e, index)}
						onClick={(e) => handleClick(e, hotel, index)}
					>
						<p className="text-white-0">{hotel.name}</p>
						<span
							className={styles.deleted}
							onClick={(e) => {
								e.stopPropagation()
								onDelete(hotel._id)
							}}
						>
							<Icon icon="lucide:delete" />
						</span>
					</div>
					{index === hotels.length - 1 && (
						<CardAddButton name="hotel" navigate={navigate} />
					)}
				</>
			))}
		</div>
	)
}
