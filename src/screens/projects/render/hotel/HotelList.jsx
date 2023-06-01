// import { useState } from 'react'
// import { HotelModal } from './hotelModal/HotelModal'
// import { useCurrentProject } from '../../../../hooks'
// import styles from '../DayEvents.module.css'
// import { CardAdd, DraggingCard } from '../../../../components/atoms'

// export const HotelList = ({ hotels, onDelete }) => {
// 	const [open, setOpen] = useState(false)
// 	const [hotelModal, setHotelModal] = useState()
// 	const [hotelIndexModal, setIndexHotelModal] = useState()

// 	const { dragAndDropHotel } = useCurrentProject()

// 	const handleDragStart = (e, index) => {
// 		e.dataTransfer.setData('hotelIndex', index)
// 	}

// 	const handleDrop = (e, index) => {
// 		e.preventDefault()
// 		const startHotelIndex = e.dataTransfer.getData('hotelIndex')
// 		dragAndDropHotel({
// 			startHotelIndex: Number(startHotelIndex),
// 			endHotelIndex: index
// 		})
// 	}

// 	const handleClick = (e, hotel, index) => {
// 		setHotelModal(hotel)
// 		setIndexHotelModal(index)
// 		setOpen(true)
// 	}

// 	if (hotels.length === 0) {
// 		return (
// 			<div className={styles.hotels}>
// 				<CardAdd
// 					route="hotel"
// 					name="hotel"
// 					timeOfEvent={null}
// 					dayOfEvent={null}
// 				/>
// 			</div>
// 		)
// 	}

// 	return (
// 		<div className={styles.hotels}>
// 			<HotelModal
// 				open={open}
// 				setOpen={setOpen}
// 				hotel={hotelModal}
// 				index={hotelIndexModal}
// 			/>

// 			{hotels?.map((hotel, index) => (
// 				<div key={hotel._id}>
// 					<DraggingCard
// 						item={hotel}
// 						index={index}
// 						handleDragStart={handleDragStart}
// 						handleDrop={handleDrop}
// 						handleDragEnd={null}
// 						handleClick={handleClick}
// 						onDelete={onDelete}
// 					/>
// 					{index === hotels.length - 1 && (
// 						<CardAdd
// 							route="hotel"
// 							name="hotel"
// 							timeOfEvent={null}
// 							dayOfEvent={null}
// 						/>
// 					)}
// 				</div>
// 			))}
// 		</div>
// 	)
// }


//esto es una prueba
import { useState, useEffect } from 'react';
import { useCurrentProject } from '../../../../hooks'
import { HotelModal } from './hotelModal/HotelModal'
//importo para un nuevo drand and drop con "dndkit"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"
//hasta aca
import { HotelCard } from "./HotelCard"
import { CardAdd } from '../../../../components/atoms'
import styles from '../DayEvents.module.css'

export const HotelList = ({ hotels, onDelete }) => {
	const { dragAndDropHotel } = useCurrentProject()
	const [hotelsState, setHotels] = useState([])
	const [open, setOpen] = useState(false)
	const [hotelModal, setHotelModal] = useState()
	const [hotelIndexModal, setIndexHotelModal] = useState()

	useEffect(() => {
		const hotelsProject = hotels.map(el => {
			const { _id, ...rest } = el
			return {
				...rest,
				id: _id,
				_id: _id
			};
		});
		setHotels(hotelsProject)
	}, [hotels])

	const handleDragEnd = (event) => {
		// console.log(event)
		const { active, over } = event;
		// console.log("dragStart", active.data.current.sortable.index)
		// console.log("dragOver", over.data.current.sortable.index)
		// console.log("active", active.id);
		// console.log("over", over.id);
		const startHotelIndex = hotelsState.findIndex((el) => el.id === active.id);
		const endHotelIndex = hotelsState.findIndex((el) => el.id === over.id);
		// const copyHotels = [...hotelsState]
		// const [hotelDragStart] = copyHotels.splice(startHotelIndex, 1)
		// copyHotels.splice(endHotelIndex, 0, hotelDragStart)
		// setHotels(copyHotels)
		setHotels(arrayMove(hotelsState, startHotelIndex, endHotelIndex)) // arrayMove es una funcion  de dnd-kit
		//se implementa el reducers
		dragAndDropHotel({
			startHotelIndex: Number(startHotelIndex),
			endHotelIndex: Number(endHotelIndex)
		})
	}

	const handleClick = (e, hotel, index) => {
		setHotelModal(hotel)
		setIndexHotelModal(index)
		setOpen(true)
	}

	if (hotels.length === 0) {
		return (
			<div className={styles.hotels}>
				<CardAdd
					route="hotel"
					name="hotel"
					timeOfEvent={null}
					dayOfEvent={null}
				/>
			</div>
		)
	}

	return (
		<div className={styles.hotels}>
			<HotelModal
				open={open}
				setOpen={setOpen}
				hotel={hotelModal}
			/>
			<DndContext
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={hotelsState}
					strategy={verticalListSortingStrategy}
				>
					{hotelsState.map((hotel, index) => (
						< HotelCard
							key={hotel._id}
							hotel={hotel}
							onDelete={onDelete}
							handleClick={handleClick}
							index={index}
						/>
					))}
				</SortableContext>
			</DndContext>
			<CardAdd
				route="hotel"
				name="hotel"
				timeOfEvent={null}
				dayOfEvent={null}
			/>
		</div>
	);
}


