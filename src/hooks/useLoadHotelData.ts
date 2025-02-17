import { useState, useEffect } from 'react'
import {IHotel} from "src/interfaces"
import {IImage} from "src/interfaces/image"


export const useLoadHotelData = (open:boolean, hotel:IHotel) => {
	const [textContent, setTextContent] = useState<string>()
	const [imagesHotel, setImagesHotel] = useState<IImage[]>([])

	useEffect(() => {
		setTextContent(hotel?.textContent)
		setImagesHotel(hotel?.imageUrlCaptions)
	}, [open, hotel])

	return { textContent, setTextContent, imagesHotel, setImagesHotel }
}
