type QueryParams = {
	[key: string]: string | number | undefined | boolean | null
}

function createOtherOperationalUrl(
	base: string,
	params: QueryParams = {}
): string {
	const url = new URL(`http://dummy.com/${base}`)

	Object.keys(params).forEach((key) => {
		const paramValue = params[key]
		if (paramValue !== undefined && paramValue !== null) {
			if (key === 'city' || key === 'searchTerm') {
				if (paramValue !== '') {
					url.searchParams.set(key, paramValue.toString())
				}
			} else {
				url.searchParams.set(key, paramValue.toString())
			}
		}
	})

	const finalUrl = url.pathname.substring(1) + url.search

	return finalUrl
}

export default createOtherOperationalUrl
