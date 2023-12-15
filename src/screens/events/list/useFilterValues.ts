import { useMemo } from 'react'

export const useFilterValues = (city?: string, price?: number) => {
	return useMemo(() => {
		const filters: { name: string; value: string | undefined }[] = [
			{ name: 'city', value: city === 'none' ? undefined : city }
		]

		if (price && !isNaN(price) && price > 0) {
			filters.push({ name: 'price[lte]', value: price.toString() })
		}

		return filters
	}, [city, price])
}
