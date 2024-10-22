type QueryParams = {
	[key: string]: string | number | undefined | boolean | null
}

export function createVendorInvoicectUrl(base: string, params: QueryParams = {}): string {
	const url = new URL(`http://dummy.com/${base}`)
	Object.keys(params).forEach((key) => {
		const paramValue = params[key]
		if (paramValue) {
			url.searchParams.set(key, paramValue.toString())
		}
	})
	const finalUrl = url.pathname.substring(1) + url.search
	return finalUrl
}