import { IHotel } from '@interfaces/hotel'
import React from 'react'

/**
 * @interface HotelNameProps
 * @description Props for the HotelName component.
 */
interface HotelNameProps {
	hotel: IHotel
	/**
	 * @property {number} index - The index of the hotel in a list, used for event handling.
	 */
	index: number
	/**
	 * Callback function triggered on double-clicking the hotel name.
	 * @param {React.MouseEvent<HTMLParagraphElement>} event - The mouse event.
	 */
	handleClick: (
		event: React.MouseEvent<HTMLParagraphElement>,
		hotel: IHotel,
		index: number
	) => void
	/**
	 * @property {object} [listeners] - Optional event listeners for drag and drop functionality.
	 */
	listeners?: Record<string, unknown> // Consider a more specific type if possible, e.g., from dnd-kit
	/**
	 * @property {boolean} isDragging - Flag indicating whether the component is currently being dragged.
	 */
	isDragging: boolean
}

/**
 * @component HotelName
 * @description A React functional component that displays the name of a hotel.
 * It supports drag-and-drop interactions and a double-click event to handle specific actions.
 * Styling is managed using Tailwind CSS classes.
 *
 * @param {HotelNameProps} props - The props for the component.
 * @returns {JSX.Element} The rendered hotel name paragraph element.
 */
export const HotelName: React.FC<HotelNameProps> = ({
	hotel,
	index,
	handleClick,
	listeners,
	isDragging
}) => {
	/**
	 * @function handleNameClick
	 * @description Handles the double-click event on the hotel name.
	 * It calls the `handleClick` prop with the event, hotel data, and index.
	 * @param {React.MouseEvent<HTMLParagraphElement>} e - The mouse event.
	 */
	const handleNameClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
		handleClick(e, hotel, index)
	}

	// Dynamically set cursor style based on dragging state using Tailwind CSS classes
	const cursorStyle = isDragging ? 'cursor-grabbing' : 'cursor-grab'

	return (
		<p
			{...listeners}
			className={`truncate ${cursorStyle}`}
			onDoubleClick={handleNameClick}
		>
			{hotel.name}
		</p>
	)
}
