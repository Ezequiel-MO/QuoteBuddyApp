import { useState } from 'react'

export const useHotelRates = () => {
	const [hotelRates, setHotelRates] = useState({
		DUInr: '',
		DUIprice: '',
		breakfast: '',
		DoubleRoomNr: '',
		DoubleRoomPrice: '',
		DailyTax: ''
	})

	const handleChange = (e) => {
		const { name, value } = e.target
		setHotelRates((prevState) => {
			return {
				...prevState,
				[name]: value
			}
		})
	}

	return { hotelRates, handleChange }
}
