type QueryParams = {
	[key: string]: string | number | undefined | boolean | null
}

function createRestaurantUrl(base: string, params: QueryParams = {}): string {
	const url = new URL(`http://dummy.com/${base}`)

	Object.keys(params).forEach((key) => {
		const paramValue = params[key]
		if (paramValue !== undefined && paramValue !== null) {
			if (key === 'price') {
				// Filter price less than or equal to the selected value
				if (Number(paramValue) > 0) {
					url.searchParams.set(`${key}[lte]`, paramValue.toString())
				}
			} else if (key === 'maxCapacity') {
				// Handle "more than 300" case
				if (String(paramValue) === '301') {
					url.searchParams.set(`${key}[gt]`, '300') // Ensure greater than 300 filter
				} else if (Number(paramValue) > 0) {
					url.searchParams.set(`${key}[lte]`, paramValue.toString())
				}
			} else if (key === 'city' || key === 'searchTerm') {
				// Set the filter if it's not an empty string
				if (paramValue !== '') {
					url.searchParams.set(key, paramValue.toString())
				}
			} else {
				// Default case for other parameters
				url.searchParams.set(key, paramValue.toString())
			}
		}
	})

	const finalUrl = url.pathname.substring(1) + url.search

	return finalUrl
}

export default createRestaurantUrl
