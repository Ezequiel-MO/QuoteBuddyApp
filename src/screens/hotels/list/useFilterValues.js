import { useMemo } from 'react'

export const useFilterValues = (city, numberStars, numberRooms) => {
	return useMemo(
		() => [
			{ name: 'city', value: city === 'none' ? undefined : city },
			{
				name: 'numberStars',
				value: numberStars === 'none' ? undefined : numberStars
			},
			{
				name: 'numberRooms[lte]',
				value: numberRooms === 'none' ? undefined : numberRooms
			}
		],
		[city, numberStars, numberRooms]
	)
}
