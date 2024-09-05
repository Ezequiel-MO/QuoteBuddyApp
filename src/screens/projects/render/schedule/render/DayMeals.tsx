import React, { useState } from 'react'
import { CardAdd, IntroAdd } from '../../../../../components/atoms'
import { EventModal } from './eventModal/EventModal'
import { IntroModal } from './introModal/IntroModal'
import { useItems } from '../../useItems'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { IDay, IRestaurant } from '@interfaces/index'
import { MealCard } from './card/MealCard'

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
	const namesMeals = ['lunch', 'dinner']

	if (!namesMeals.includes(event)) {
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
			<div className="grid gap-2 hover:bg-gray-700 p-2" ref={setNodeRef}>
				<EventModal
					open={open}
					setOpen={setOpen}
					event={eventModal}
					dayIndex={dayIndex}
					typeOfEvent={event}
				/>
				<CardAdd
					renderAddCard={renderAddCard}
					name="restaurant"
					route="restaurant"
					timeOfEvent={event}
					dayOfEvent={dayIndex}
				/>
				{hasRestaurants && (
					<>
						<IntroAdd setOpen={setOpenModalIntro} events={day[event]} />
						<IntroModal
							day={day.date}
							open={openModalIntro}
							setOpen={setOpenModalIntro}
							eventType={event}
							dayIndex={dayIndex}
							events={day[event]}
						/>
					</>
				)}

				{hasRestaurants ? (
					restaurants?.map((el: IRestaurant, index: number) => {
						return (
							<MealCard
								key={el._id}
								event={el}
								handleClick={handleClick}
								onDelete={() => handleDeleteEvent(dayIndex, event, el._id)}
								index={index}
								dayIndex={dayIndex}
								typeEvent={event}
							/>
						)
					})
				) : (
					<div className="text-center text-gray-400">No restaurants added</div>
				)}
			</div>
		</SortableContext>
	)
}
