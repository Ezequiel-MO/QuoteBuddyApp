import { useState, FC, MouseEvent } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import styles from '../DayEvents.module.css'
import { DeleteIcon } from '../../../../components/atoms'
import { HotelName } from './HotelName'
import { ButtonModalMetting } from './addMeetingModal/ButtonModalMetting'
import { AddMeetingsModal } from './addMeetingModal/MeetingModal'
import { ButtonModalMeetingImages } from './addMeetingImagesModal/ButtonModalMettingImages'
import { AddMeetingsImagesModal } from './addMeetingImagesModal/AddMeetingsImagesModal'
import { useScheduleContext } from '../schedule/render/ScheduleContext'
import { IHotel } from "src/interfaces"

interface IHotelId{
	id:string
}

interface HotelCardProps {
	hotel: IHotel & IHotelId
	onDelete: () => void
	handleClick: (
		e: MouseEvent<HTMLElement>,
		hotel: IHotel
	) => void
	index: number
	typeEvent: string
	dayIndex: number
}

export const HotelCard: FC<HotelCardProps> = ({ hotel, onDelete, handleClick, index }) => {
	const [open, setOpen] = useState(false)
	const [openMeetingImages, setOpenMeetingImages] = useState(false)
	const { selectedTab } = useScheduleContext()
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({ id: hotel.id })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	}

	const handleOpenModalMetting = () => {
		setOpen(true)
	}

	const handleOpenModalMeetingImages = () => {
		setOpenMeetingImages(true)
	}

	return (
		<div style={{ position: 'sticky' }}>
			<AddMeetingsModal open={open} setOpen={setOpen} hotel={hotel} />
			<AddMeetingsImagesModal
				open={openMeetingImages}
				setOpen={setOpenMeetingImages}
				hotel={hotel}
			/>
			<div
				className={styles.cardHotel}
				style={style}
				ref={setNodeRef}
				{...attributes}
				onClick={(e) => handleClick(e, hotel)}
			>
				<HotelName
					hotel={hotel}
					index={index}
					handleClick={handleClick}
					listeners={listeners}
					isDragging={isDragging}
				/>
				<DeleteIcon onDelete={onDelete} id={hotel.id} />
				{!isDragging && selectedTab === "Meetings" && (
					<ButtonModalMetting
						handleOpenModalMetting={handleOpenModalMetting}
					/>
				)}
				{!isDragging && selectedTab === "Meetings" && (
					<ButtonModalMeetingImages
						hotel={hotel}
						handleOpen={handleOpenModalMeetingImages}
					/>
				)}
			</div>
		</div>
	)
}
