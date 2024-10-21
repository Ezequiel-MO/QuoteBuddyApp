type QueryParams = {
	[key: string]: string | number | undefined | boolean | null
}

export function createVendorInvoicectUrl(base: string, params: QueryParams = {}): string {
	const url = new URL(`http://dummy.com/${base}`)
	Object.keys(params).forEach((key) => {
		const paramValue = params[key]
		// if (paramValue !== undefined && paramValue !== null) {
		// 	if (key === 'groupLocation' || key === 'searchTerm') {
		// 		// Set the filter if it's not an empty string
		// 		if (paramValue !== '') {
		// 			url.searchParams.set(key, paramValue.toString())
		// 		}
		// 	} else {
		// 		// Default case for other parameters
		// 		url.searchParams.set(key, paramValue.toString())
		// 	}
		// }
		if (paramValue) {
			url.searchParams.set(key, paramValue.toString())
		}
	})
	const finalUrl = url.pathname.substring(1) + url.search
	// console.log(url.pathname.substring(1))
	// console.log(finalUrl)
	return finalUrl
}