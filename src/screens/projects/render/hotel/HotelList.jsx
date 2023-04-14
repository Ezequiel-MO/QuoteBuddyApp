import { useState } from 'react';
import { Icon } from '@iconify/react'
import styles from '../DayEvents.module.css'
import { useCurrentProject } from '../../../../hooks'

export const HotelList = ({ hotels, onDelete }) => {
	const { dragAndDropHotel } = useCurrentProject()

	const handleDragStart = (e, index) => {
		e.dataTransfer.setData("hotelIndex", index)
	};


	const handleDrop = (e, index) => {
		e.preventDefault();
		const startHotelIndex = e.dataTransfer.getData("hotelIndex")
		dragAndDropHotel({
			startHotelIndex: Number(startHotelIndex),
			endHotelIndex: index
		})
	};

	const handleDragOver = (e) => {
		e.preventDefault()
	}


	if (hotels.length === 0) return null

	return (
		<div className={styles.hotels}>
			{hotels.map((hotel , index) => (
				<div
					className={styles.hotel}
					key={hotel._id}
					draggable
					onDragStart={(e) => handleDragStart(e, index)}
					onDragOver={handleDragOver}
					onDrop={(e) => handleDrop(e, index)}
				>
					<p className="text-white-50">{hotel.name}</p>
					<span className={styles.deleted} onClick={() => onDelete(hotel._id)}>
						<Icon icon="lucide:delete" color="#ea5933" />
					</span>
				</div>
			))}
		</div>
	)
}




//version drag and drop con useState() 
// export const HotelList = ({ hotels, onDelete }) => {
// 	const [hotelsState, setHotels] = useState(hotels)

// 	const handleDragStart = (e, hotel, index) => {
// 		// console.log(hotel)
// 		// console.log(index)
// 		e.dataTransfer.setData("hotelId", hotel._id)
// 		e.dataTransfer.setData("hotelIndex", index)
// 	};


// 	const handleDrop = (e, hotel, index) => {
// 		e.preventDefault();
// 		// console.log(index)
// 		const startHotelIndex = e.dataTransfer.getData("hotelIndex")
// 		// console.log({strart:Number(startHotelIndex) , end:index })
// 		const copyHotels = [...hotelsState]
// 		const [hotelDragStart] = copyHotels.splice(startHotelIndex, 1)
// 		// console.log(hotelDragStart)
// 		copyHotels.splice(index, 0, hotelDragStart)
// 		// console.log(copyHotels)
// 		setHotels(copyHotels)
// 	};

// 	const handleDragOver = (e) => {
// 		e.preventDefault()
// 	}


// 	if (hotelsState.length === 0) return null;

// 	return (
// 		<div className={styles.hotels}>
// 			{hotelsState.map((hotel, index) => (
// 				<div
// 					key={hotel._id}
// 					className={styles.hotel}
// 					draggable
// 					onDragStart={(e) => handleDragStart(e, hotel, index)}
// 					onDragOver={handleDragOver}
// 					onDrop={(e) => handleDrop(e, hotel, index)}
// 				>
// 					<p className="text-white-50">
// 						{hotel.name}
// 					</p>
// 					<p className="text-white-50">"Ubicacion {index + 1}"</p>
// 					<span className={styles.deleted} onClick={() => onDelete(hotel._id)}>
// 						<Icon icon="lucide:delete" color="#ea5933" />
// 					</span>
// 				</div>
// 			))}
// 		</div>
// 	)
// }