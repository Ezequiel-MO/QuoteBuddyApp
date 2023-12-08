import { useState, useEffect } from 'react'
import {IHotel} from "src/interfaces"

export const useLoadHotelData = (open:boolean, hotel:IHotel) => {
	const [textContent, setTextContent] = useState<string>()
	const [imagesHotel, setImagesHotel] = useState<string[]>([])

	useEffect(() => {
		setTextContent(hotel?.textContent)
		setImagesHotel(hotel?.imageContentUrl)
	}, [open, hotel])

	return { textContent, setTextContent, imagesHotel, setImagesHotel }
}
