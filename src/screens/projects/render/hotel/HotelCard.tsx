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

	useEffect(() => {
		return () => {
			if (enterTimeoutId.current !== null) {
				clearTimeout(enterTimeoutId.current)
			}
			if (leaveTimeoutId.current !== null) {
				clearTimeout(leaveTimeoutId.current)
			}
		}
	}, [enterTimeoutId.current, leaveTimeoutId, isDragging])

	return (
		<div
			className={
				`min-w-[250px] relative mt-2 p-2 rounded-lg border-2 border-gray-400 bg-black-50 
				hover:bg-gray-600 cursor-pointer transition-all duration-500  shadow-sm 
				${openOptions && state.selectedTab === 'Meetings' && !isDragging
					? 'bg-gray-700 border-gray-500 shadow-lg'
					: 'bg-gray-800'
				}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			ref={setNodeRef}
			{...attributes}
			onClick={(e) => state.selectedTab === 'Hotels' && handleClick(e, hotel)}
			style={{
				transform: CSS.Transform.toString(transform),
				transition: transition ? transition : 'transform 200ms ease' // Add transition effect for the transform property
			}}
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
					onDelete={state.selectedTab !== "Meetings" ? onDelete : () => setOpenModalOptions(prev => !prev)}
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
			{/* Contenedor de expansión */}
			<div
				className={`overflow-hidden transition-all duration-700 ease-in-out 
						${openOptions && state.selectedTab === 'Meetings' && !isDragging
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
