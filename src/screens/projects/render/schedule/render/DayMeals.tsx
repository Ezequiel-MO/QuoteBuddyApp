import React, { useState } from 'react'
import { CardAdd, IntroAdd } from '../../../../../components/atoms'
import { EventModal } from './eventModal/EventModal'
import { IntroModal } from './introModal/IntroModal'
import { useItems } from '../../useItems'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { IRestaurant } from '@interfaces/index'
import { MealCard } from './card/MealCard'
import { IDay } from '@interfaces/project'
import { TimeOfEvent } from '@redux/features/currentProject/types'

interface DayMealsProps {
	day: IDay
	event: string
	handleDeleteEvent: (
		dayIndex: number,
		timeOfEvent: string,
		eventId: string
	) => void
	dayIndex: number
	renderAddCard?: boolean
}

export const DayMeals: React.FC<DayMealsProps> = ({
	day,
	event,
	handleDeleteEvent,
	dayIndex,
	renderAddCard = true
}) => {
	const validMeals = ['lunch', 'dinner']

	if (!validMeals.includes(event)) {
		return null
	}
	const { setNodeRef } = useDroppable({
		id: `${event}-${dayIndex}`
	})
	const restaurants = !Object.keys(day[event]).includes('restaurants')
		? day[event]
		: day[event]?.restaurants

	const hasRestaurants = restaurants && restaurants.length > 0

	const { itemsState } = useItems(restaurants)
	const [open, setOpen] = useState(false)
	const [eventModal, setEventModal] = useState<IRestaurant | undefined>(
		undefined
	)
	const [, setIndexEventModal] = useState<number | undefined>(undefined)
	const [openModalIntro, setOpenModalIntro] = useState<boolean>(false)

	const handleClick = (
		e: React.MouseEvent<HTMLElement>,
		eventModal: IRestaurant,
		index: number
	) => {
		e.preventDefault()
		setEventModal(eventModal)
		setIndexEventModal(index)
		setOpen(true)
	}

	return (
		<SortableContext
			id={event + '-' + dayIndex}
			items={itemsState}
			strategy={verticalListSortingStrategy}
		>
			<div
				className="bg-gray-800 rounded-lg shadow-md p-3 transition-all duration-300 border border-gray-700 h-full min-h-[200px] hover:border-orange-800"
				ref={setNodeRef}
			>
				<EventModal
					open={open}
					setOpen={setOpen}
					event={eventModal}
					dayIndex={dayIndex}
					typeOfEvent={event}
				/>

				{/* Header with Add Card */}
				<div className="mb-3">
					{renderAddCard && (
						<CardAdd
							name="restaurant"
							route="restaurant"
							timeOfEvent={event}
							dayOfEvent={dayIndex}
						/>
					)}
				</div>

				{/* Intro Section */}
				{hasRestaurants && (
					<div className="mb-2">
						<IntroAdd setOpen={setOpenModalIntro} events={day[event]} />
						<IntroModal
							day={day.date}
							open={openModalIntro}
							setOpen={setOpenModalIntro}
							eventType={event as TimeOfEvent}
							dayIndex={dayIndex}
							events={day[event]}
						/>
					</div>
				)}

				{/* Restaurants List */}
				<div className="space-y-2 mt-2">
					{hasRestaurants ? (
						restaurants?.map((el: IRestaurant, index: number) => (
							<MealCard
								key={el._id}
								event={el}
								handleClick={handleClick}
								onDelete={() => handleDeleteEvent(dayIndex, event, el._id)}
								index={index}
								dayIndex={dayIndex}
								typeEvent={event as 'lunch' | 'dinner'}
							/>
						))
					) : (
						<div className="text-gray-500 text-center py-4 italic">
							No restaurants added
						</div>
					)}
				</div>
			</div>
		</SortableContext>
	)
}
