import { useMemo } from 'react'

export const useFilterValues = (
	city: string,
	numberStars: number,
	numberRooms: number
) => {
	return useMemo(
		() => [
			{ name: 'city', value: city === 'none' ? undefined : city },
			{
				name: 'numberStars',
				value: numberStars === 0 ? undefined : numberStars
			},
			{
				name: 'numberRooms[lte]',
				value: numberRooms === 0 ? undefined : numberRooms
			}
		],
		[city, numberStars, numberRooms]
	)
}
