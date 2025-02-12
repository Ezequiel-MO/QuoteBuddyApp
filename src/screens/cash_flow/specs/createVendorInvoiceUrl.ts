// src/your-context-folder/createVendorInvoiceUrl.ts

type QueryParams = {
	[key: string]: string | number | undefined | boolean | null
}

export function createVendorInvoiceUrl(
	base: string,
	params: QueryParams = {}
): string {
	const url = new URL(`http://dummy.com/${base}`)

	Object.keys(params).forEach((key) => {
		const paramValue = params[key]

		// Skip if undefined or null
		if (paramValue === undefined || paramValue === null) return

		// If the parameter is a string, ignore if it's empty after trimming.
		if (typeof paramValue === 'string' && paramValue.trim() === '') return

		// For numeric parameters (except pagination fields), skip if zero.
		if (
			typeof paramValue === 'number' &&
			paramValue === 0 &&
			key !== 'page' &&
			key !== 'limit'
		) {
			return
		}

		url.searchParams.set(key, paramValue.toString())
	})

	const finalUrl = url.pathname.substring(1) + url.search
	return finalUrl
}
