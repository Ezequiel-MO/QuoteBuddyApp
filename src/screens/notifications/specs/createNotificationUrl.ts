type QueryParams = {
	[key: string]: string | number | undefined | boolean | null
}

function createNotificationUrl(base: string, params: QueryParams = {}): string {
	const url = new URL(`http://dummy.com/${base}`)

	Object.keys(params).forEach((key) => {
		const paramValue = params[key]
		if (paramValue !== undefined && paramValue !== null) {
			if (key === 'searchTerm') {
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

export default createNotificationUrl
