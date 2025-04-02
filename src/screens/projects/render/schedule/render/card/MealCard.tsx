import { useState, useEffect, FC, MouseEvent } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { EventName } from './EventName'
import { EventCardTransfer } from './EventCardTransfer'
import { IconTransfer } from './IconTransfer'
import { IEntertainment, IRestaurant } from '../../../../../../interfaces'
import { DeleteIcon } from '@components/atoms'
import { EyeIconDetail } from './EyeIconDetail'
import { Icon } from '@iconify/react'
import { ModalVenue } from './modalVenueRestaurant/ModalVenue'
import { ModalPriceEntertainment } from '../../../../../entertainment/list/modalPrice/ModalPriceEntertainment'

interface MealCardProps {
	event: IRestaurant
	onDelete: () => void
	handleClick: (
		e: MouseEvent<HTMLElement>,
		event: IRestaurant,
		index: number
	) => void
	index: number
	typeEvent: 'lunch' | 'dinner'
	dayIndex: number
}

export const MealCard: FC<MealCardProps> = ({
	event,
	onDelete,
	handleClick,
	index,
	typeEvent,
	dayIndex
}) => {
	const [openInfoTransfer, setOpenInfoTransfer] = useState(false)
	const [openVenueModal, setOpenVenueModal] = useState(false)
	const [openEntertainmentModal, setOpenEntertainmentModal] = useState(false)
	const [change, setChange] = useState(false)
	const [show, setShow] = useState(false)
	const [selectedEntertainment, setSelectedEntertainment] =
		useState<IEntertainment | null>(null)

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({
		id: event._id || `meal-${index}`
	})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	}

	const [enterTimeout, setEnterTimeout] = useState<NodeJS.Timeout | null>(null)
	const [leaveTimeout, setLeaveTimeout] = useState<NodeJS.Timeout | null>(null)

	const handleMouseEnter = () => {
		if (leaveTimeout) {
			clearTimeout(leaveTimeout)
		}
		const timeoutId = setTimeout(() => {
			setChange(true)
			setOpenInfoTransfer(true)
		}, 400)
		setEnterTimeout(timeoutId)
	}

	const handleMouseLeave = () => {
		if (enterTimeout) {
			clearTimeout(enterTimeout)
		}
		const timeoutId = setTimeout(() => {
			setChange(false)
		}, 400)
		setLeaveTimeout(timeoutId)
	}

	useEffect(() => {
		if (change) {
			setTimeout(() => {
				setShow(true)
			}, 180)
		} else {
			setShow(false)
			setOpenInfoTransfer(false)
		}
	}, [change])

	useEffect(() => {
		return () => {
			if (enterTimeout) clearTimeout(enterTimeout)
			if (leaveTimeout) clearTimeout(leaveTimeout)
		}
	}, [enterTimeout, leaveTimeout])

	const isVenue = event.isVenue
	const hasEntertainment = event.entertainment && event.entertainment.length > 0

	const handleEditEntertainment = (entertainment: IEntertainment) => {
		setSelectedEntertainment(entertainment)
		setOpenEntertainmentModal(true)
	}

	return (
		<div
			className={`relative rounded-lg overflow-hidden shadow-lg ${
				isDragging
					? 'bg-orange-800/60 border-2 border-orange-500 cursor-grabbing'
					: 'bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 hover:from-gray-650 hover:to-gray-750 cursor-grab'
			} transition-all duration-300 ease-in-out`}
			ref={setNodeRef}
			style={style}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...attributes}
		>
			{/* Venue Modal */}
			<ModalVenue
				open={openVenueModal}
				setOpen={setOpenVenueModal}
				restaurant={event}
				typeMeal={typeEvent}
				dayIndex={dayIndex}
				setChange={setChange}
			/>

			{/* Entertainment Modal */}
			{selectedEntertainment && (
				<ModalPriceEntertainment
					entertainmentShow={selectedEntertainment}
					open={openEntertainmentModal}
					setOpen={setOpenEntertainmentModal}
					setChange={setChange}
					infoUpdate={{
						dayIndex,
						isUpdadte: true,
						typeMeal: typeEvent,
						idRestaurant: event._id
					}}
				/>
			)}

			<div className="flex flex-col p-3 group">
				<div className="flex items-start">
					{/* Detail Icon */}
					<div className="flex-shrink-0 mr-2 w-6 flex justify-center">
						<EyeIconDetail
							handleClick={(e) => handleClick(e, event, index)}
							isDragging={isDragging}
						/>
					</div>

					{/* Restaurant Name */}
					<div className="flex-grow">
						<EventName
							event={event}
							index={index}
							handleClick={handleClick}
							listeners={listeners}
							isDragging={isDragging}
						/>

						{/* Venue and Entertainment Tags */}
						<div className="flex space-x-2 mt-1">
							{isVenue && (
								<span
									className="inline-block px-2 py-0.5 text-xs font-medium 
                                    bg-orange-900 text-orange-200 rounded"
								>
									Venue
								</span>
							)}
							{hasEntertainment && (
								<span
									className="inline-block px-2 py-0.5 text-xs font-medium 
                                    bg-purple-900 text-purple-200 rounded"
								>
									Entertainment
								</span>
							)}
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex-shrink-0 ml-1 w-6 flex justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-200">
						<DeleteIcon onDelete={onDelete} id={event._id} />
					</div>
				</div>

				{/* Expanded Section */}
				{change && (
					<div
						className={`transition-all duration-500 ease-in-out px-3 pb-3 ${
							show ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
						}`}
					>
						{/* Action Buttons */}
						<div className="flex flex-wrap gap-2 mt-2">
							{/* Add Transfer Button */}
							{!isDragging && (
								<IconTransfer
									event={event}
									typeEvent={typeEvent}
									dayIndex={dayIndex}
								/>
							)}

							{/* Add Venue Button - only show if restaurant is flagged as a venue */}
							{isVenue && !isDragging && (
								<button
									type="button"
									className="inline-flex items-center px-3 py-1.5 rounded-full bg-orange-900/80 hover:bg-orange-800 
                                    text-white-0 transition-colors duration-200 shadow-sm border border-orange-700 text-sm"
									onClick={(e) => {
										e.stopPropagation()
										setOpenVenueModal(true)
									}}
								>
									<Icon
										icon="mdi:building-cog"
										className="mr-1.5 text-orange-300"
									/>
									<span className="font-medium">
										{event.venue_price &&
										Object.keys(event.venue_price).length > 0
											? 'Edit Venue Prices'
											: 'Add Venue Prices'}
									</span>
								</button>
							)}

							{/* Add/Edit Entertainment Button - only for venues */}
							{isVenue && !isDragging && (
								<div className="flex flex-col space-y-2">
									{hasEntertainment ? (
										event.entertainment?.map((entertainment, idx) => (
											<button
												key={idx}
												type="button"
												className="inline-flex items-center px-3 py-1.5 rounded-full bg-purple-900/80 hover:bg-purple-800 
                                                text-white-0 transition-colors duration-200 shadow-sm border border-purple-700 text-sm"
												onClick={(e) => {
													e.stopPropagation()
													handleEditEntertainment(entertainment)
												}}
											>
												<Icon
													icon="mdi:music-note"
													className="mr-1.5 text-purple-300"
												/>
												<span className="font-medium">
													Edit {entertainment.name}
												</span>
											</button>
										))
									) : (
										<button
											type="button"
											className="inline-flex items-center px-3 py-1.5 rounded-full bg-purple-900/80 hover:bg-purple-800 
                                            text-white-0 transition-colors duration-200 shadow-sm border border-purple-700 text-sm"
											onClick={(e) => {
												e.stopPropagation()
												// Add navigation or modal to add new entertainment
												// You might want to add a prop or logic to handle adding new entertainment
											}}
										>
											<Icon
												icon="mdi:music-note"
												className="mr-1.5 text-purple-300"
											/>
											<span className="font-medium">Add Entertainment</span>
										</button>
									)}
								</div>
							)}
						</div>

						{/* Transfer Details */}
						<EventCardTransfer
							key={event._id}
							event={event}
							open={openInfoTransfer}
							setOpen={setOpenInfoTransfer}
							typeEvent={typeEvent}
							dayIndex={dayIndex}
							setChange={setChange}
							openModalVenue={openVenueModal || openEntertainmentModal}
						/>
					</div>
				)}
			</div>
		</div>
	)
}
