import { useEffect, useState } from 'react'

export const useHotels = (hotels) => {
	const [hotelsState, setHotels] = useState([])

	useEffect(() => {
		const hotelsProject = hotels.map(({ _id, ...rest }) => ({
			...rest,
			id: _id,
			_id
		}))
		setHotels(hotelsProject)
	}, [hotels])

	return [hotelsState, setHotels]
}
