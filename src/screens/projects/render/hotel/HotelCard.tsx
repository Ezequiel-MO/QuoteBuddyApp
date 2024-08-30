import React, { useState, FC, useRef, useEffect } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DeleteIcon } from '../../../../components/atoms'
import { HotelName } from './HotelName'
import { ButtonModalMetting } from './addMeetingModal/ButtonModalMetting'
import { AddMeetingsModal } from './addMeetingModal/MeetingModal'
import { ButtonModalMeetingImages } from './addMeetingImagesModal/ButtonModalMettingImages'
import { AddMeetingsImagesModal } from './addMeetingImagesModal/AddMeetingsImagesModal'
import { ModalOptions } from './meetingModalOptions/ModalOptions'
import { IHotel } from 'src/interfaces'
import { useProject } from '@screens/projects/context/ProjectContext'

interface HotelCardProps {
	hotel: IHotel
	onDelete: () => void
	handleClick: (e: React.MouseEvent<HTMLDivElement>, hotel: IHotel) => void
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

	// Manage mouse enter and leave events with timeouts
	const [openOptions, setOpenOptions] = useState(false)
	const enterTimeoutId = useRef<number | null>(null)
	const leaveTimeoutId = useRef<number | null>(null)

	const handleMouseEnter = () => {
		if (leaveTimeoutId.current !== null) {
			clearTimeout(leaveTimeoutId.current)
		}
		enterTimeoutId.current = window.setTimeout(() => {
			setOpenOptions(true)
		}, 350)
	}

	const handleMouseLeave = () => {
		if (enterTimeoutId.current !== null) {
			clearTimeout(enterTimeoutId.current)
		}
		leaveTimeoutId.current = window.setTimeout(() => {
			setOpenOptions(false)
		}, 350)
	}

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
	} = useSortable({ id: hotel._id ?? index.toString() })

	const handleOpenModalMeetingImages = () => {
		setOpenMeetingImages(true)
	}

	return (
		<div
			className={`min-w-[250px] relative mt-2 p-2 rounded-lg border-2 border-gray-400 bg-black-50 hover:bg-gray-600 cursor-pointer transition duration-150 ease-in-out shadow-sm ${
				openOptions && state.selectedTab === 'Meetings' && !isDragging
					? 'bg-gray-700 border-gray-500 shadow-lg'
					: 'bg-gray-800'
			}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			ref={setNodeRef}
			{...attributes}
			onClick={(e) => handleClick(e, hotel)}
			style={{
				transform: CSS.Transform.toString(transform),
				transition: transition ? transition : 'transform 200ms ease' // Add transition effect for the transform property
			}}
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
				id={hotel._id ?? index.toString()}
				onDelete={onDelete}
			/>
			<div className="flex items-center justify-between w-full">
				<HotelName
					hotel={hotel}
					index={index}
					handleClick={handleClick}
					listeners={listeners}
					isDragging={isDragging}
				/>
				<DeleteIcon onDelete={onDelete} id={hotel._id ?? index.toString()} />
			</div>
			{openOptions && !isDragging && state.selectedTab === 'Meetings' && (
				<div className="absolute top-full left-0 mt-2">
					<ButtonModalMeetingImages
						hotel={hotel}
						handleOpen={handleOpenModalMeetingImages}
					/>
					<div className="mt-2">
						<ButtonModalMetting handleOpenModalMetting={() => setOpen(true)} />
					</div>
				</div>
			)}
		</div>
	)
}
