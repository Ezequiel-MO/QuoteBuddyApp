import { useState, useEffect } from 'react'

export const useLoadHotelData = (open, hotel) => {
	const [textContent, setTextContent] = useState()
	const [imagesHotel, setImagesHotel] = useState([])

	useEffect(() => {
		setTextContent(hotel?.textContent)
		setImagesHotel(hotel?.imageContentUrl)
	}, [open, hotel])

	return { textContent, setTextContent, imagesHotel, setImagesHotel }
}
