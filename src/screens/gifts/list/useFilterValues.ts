import { useMemo } from 'react'

export const useFilterValues = (price: number) => {
	return useMemo(
		() => [{ name: 'price[lte]', value: price === 0 ? undefined : price }],
		[price]
	)
}
