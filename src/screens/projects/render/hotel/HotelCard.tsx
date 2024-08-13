import { useState, FC, MouseEvent, useRef, useEffect } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import styles from '../DayEvents.module.css'
import { DeleteIcon } from '../../../../components/atoms'
import { HotelName } from './HotelName'
import { ButtonModalMetting } from './addMeetingModal/ButtonModalMetting'
import { AddMeetingsModal } from './addMeetingModal/MeetingModal'
import { ButtonModalMeetingImages } from './addMeetingImagesModal/ButtonModalMettingImages'
import { AddMeetingsImagesModal } from './addMeetingImagesModal/AddMeetingsImagesModal'
import { ModalOptions } from './meetingModalOptions/ModalOptions'
import { IHotel } from 'src/interfaces'
import { useProject } from '@screens/projects/context/ProjectContext'

interface IHotelId {
	id: string
}

interface HotelCardProps {
	hotel: IHotel & IHotelId
	onDelete: () => void
	handleClick: (e: MouseEvent<HTMLElement>, hotel: IHotel) => void
	index: number
	typeEvent?: string
	dayIndex?: number
}

export const HotelCard: FC<HotelCardProps> = ({
	hotel,
	onDelete,
	handleClick,
	index,
	dayIndex
}) => {
	const [open, setOpen] = useState(false)
	const [openMeetingImages, setOpenMeetingImages] = useState(false)
	const [openModalOptions, setOpenModalOptions] = useState(false)
	const { state } = useProject()

	//MANEJAR EL EVENTO "onMouseEnte" Y "onMouseLeave" con el setTimeOut
	const [openOptions, setOpenOptions] = useState(false)
	// Refs para mantener los IDs de los timeouts
	const enterTimeoutId = useRef<number | null>(null)
	const leaveTimeoutId = useRef<number | null>(null)
	//handle cuando el mouese esta sobre el div
	const handleMouseEnter = () => {
		// Limpiar el timeout de leave antes de empezar uno nuevo
		if (leaveTimeoutId.current !== null) {
			clearTimeout(leaveTimeoutId.current)
		}
		enterTimeoutId.current = setTimeout(() => {
			setOpenOptions(true)
		}, 350) as unknown as number // con "unknown" le digo que confie en mi que va ser de tipo number
	}
	//handle cuando el mouese sale del div
	const handleMouseLeave = () => {
		if (enterTimeoutId.current !== null) {
			clearTimeout(enterTimeoutId.current)
		}
		leaveTimeoutId.current = setTimeout(() => {
			setOpenOptions(false)
		}, 350) as unknown as number
	}
	//useEffect para limppiar los "temporizadores"
	useEffect(() => {
		return () => {
			if (enterTimeoutId.current !== null) {
				clearTimeout(enterTimeoutId.current)
			}
			if (leaveTimeoutId.current !== null) {
				clearTimeout(leaveTimeoutId.current)
			}
		}
	}, [])

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({ id: hotel.id ?? hotel._id })

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
		<div
			style={{ position: 'sticky' }}
			className={
				openOptions && state.selectedTab === 'Meetings' && !isDragging
					? styles.containerHoteltOpen
					: ''
			}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<AddMeetingsModal open={open} setOpen={setOpen} hotel={hotel} />
			<AddMeetingsImagesModal
				open={openMeetingImages}
				setOpen={setOpenMeetingImages}
				hotel={hotel}
				dayIndex={dayIndex}
			/>
			<ModalOptions
				open={openModalOptions}
				setOpen={setOpenModalOptions}
				id={hotel.id ?? hotel._id}
				onDelete={onDelete}
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
				<DeleteIcon
					onDelete={
						state.selectedTab !== 'Meetings'
							? onDelete
							: () => setOpenModalOptions((prev) => !prev)
					}
					id={hotel.id ?? hotel._id}
				/>
			</div>
			{openOptions && !isDragging && state.selectedTab === 'Meetings' && (
				<div>
					<ButtonModalMeetingImages
						hotel={hotel}
						handleOpen={handleOpenModalMeetingImages}
					/>
					<div style={{ marginTop: '10px' }}>
						<ButtonModalMetting
							handleOpenModalMetting={handleOpenModalMetting}
						/>
					</div>
				</div>
			)}
		</div>
	)
}
