import React, { useState, useEffect, FC, useRef } from 'react'
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

	const [openOptions, setOpenOptions] = useState(false)
	const enterTimeoutId = useRef<number | null>(null)
	const leaveTimeoutId = useRef<number | null>(null)

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({ id: hotel._id ?? index.toString() })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition: transition ? transition : 'transform 200ms ease'
	}

	const handleMouseEnter = () => {
		if (leaveTimeoutId.current !== null) {
			clearTimeout(leaveTimeoutId.current)
		}
		enterTimeoutId.current = window.setTimeout(() => {
			setOpenOptions(true)
		}, 400)
	}

	const handleMouseLeave = () => {
		if (enterTimeoutId.current !== null) {
			clearTimeout(enterTimeoutId.current)
		}
		leaveTimeoutId.current = window.setTimeout(() => {
			setOpenOptions(false)
		}, 500)
	}

	const handleOpenModalMeetingImages = () => {
		setOpenMeetingImages(true)
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

	return (
		<div
			className={`relative mt-2 p-2 rounded-lg border-2 border-gray-500 bg-gray-700 
        hover:bg-gray-600 cursor-pointer transition-all duration-300 shadow-md`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			ref={setNodeRef}
			style={style}
			onClick={(e) => state.selectedTab === 'Hotels' && handleClick(e, hotel)}
			{...attributes}
		>
			<div className="flex items-center justify-between w-full">
				<HotelName
					hotel={hotel}
					index={index}
					handleClick={(e) => handleClick(e, hotel)}
					listeners={listeners}
					isDragging={isDragging}
				/>
				<ModalOptions
					open={openModalOptions}
					setOpen={setOpenModalOptions}
					id={hotel._id ?? index.toString()}
					onDelete={onDelete}
				/>
				<DeleteIcon
					onDelete={
						state.selectedTab !== 'Meetings'
							? onDelete
							: () => setOpenModalOptions((prev) => !prev)
					}
					id={hotel.id}
				/>
			</div>
			<AddMeetingsModal open={open} setOpen={setOpen} hotel={hotel} />
			<AddMeetingsImagesModal
				open={openMeetingImages}
				setOpen={setOpenMeetingImages}
				hotel={hotel}
				dayIndex={dayIndex as number}
			/>

			{/* Expanding container for "Meetings" tab */}
			<div
				className={`overflow-hidden transition-all duration-700 ease-in-out 
          ${
						openOptions && state.selectedTab === 'Meetings' && !isDragging
							? 'max-h-[250px] opacity-100 mt-2'
							: 'max-h-0 opacity-0'
					}
        `}
			>
				<ButtonModalMeetingImages
					hotel={hotel}
					handleOpen={(e) => {
						e.stopPropagation()
						handleOpenModalMeetingImages()
					}}
				/>
				<div className="mt-2">
					<ButtonModalMetting handleOpenModalMetting={() => setOpen(true)} />
				</div>
			</div>
		</div>
	)
}
