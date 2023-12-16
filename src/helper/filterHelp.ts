interface FilterValue {
	name: string
	value: any
}

interface FilterParams {
	valuesRute: FilterValue[]
	url: string
	filterOptions: string[]
	page: number
	limit?: string
	includePagination?: boolean
}

// Function to append pagination parameters to the URL
const appendPagination = (url: string, page: number, limit: string): string => {
	const separator = url.includes('?') ? '&' : '?'
	return `${url}${separator}page=${page}&limit=${limit}`
}

// Function to filter values based on the provided options
const filterValues = (
	valuesRute: FilterValue[],
	filterOptions: string[]
): FilterValue[] => {
	return valuesRute.filter(
		({ name, value }) =>
			filterOptions.some((option) => name.includes(option)) &&
			value !== undefined
	)
}

// Function to append filter values to the URL
const appendFiltersToUrl = (
	url: string,
	valuesUrlFilters: FilterValue[]
): string => {
	const filterString = valuesUrlFilters
		.map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
		.join('&')
	return filterString ? `${url}?${filterString}` : url
}

// Main filter function
export const filter = ({
	valuesRute,
	url,
	filterOptions,
	page = 1,
	limit = '10',
	includePagination = true
}: FilterParams): string => {
	// Get filter values based on the provided options
	const valuesUrlFilters = filterValues(valuesRute, filterOptions)

	// Append filters to URL first
	let resultsUrl = appendFiltersToUrl(url, valuesUrlFilters)

	// If pagination is included, append it after the filters
	if (includePagination) {
		resultsUrl = appendPagination(resultsUrl, page, limit)
	}

	return resultsUrl
}

interface FilterDocumentLengthParams {
	valuesRute: FilterValue[]
	url: string
	filterOptions: string[]
}

export const filterDocumentLength = ({
	valuesRute,
	url,
	filterOptions
}: FilterDocumentLengthParams): string => {
	let resultsUrl = `${url}?`
	const valuesUrlFilters: FilterValue[] = []
	for (let i = 0; i < valuesRute.length; i++) {
		for (let j = 0; j < filterOptions.length; j++) {
			if (
				valuesRute[i].name.includes(filterOptions[j]) &&
				valuesRute[i].value
			) {
				valuesUrlFilters.push(valuesRute[i])
			}
		}
	}
	const newUrl = valuesUrlFilters
		.map(({ name, value }) => `${name}=${value}`)
		.join('&')

	return resultsUrl + newUrl
}

interface FilterTransfersParams extends FilterParams {
	page: number
}

export const filterTransfers = ({
	valuesRute,
	url,
	filterOptions,
	page
}: FilterTransfersParams): string => {
	let resultsUrl = `${url}?page=${page}&limit=100&`
	let valuesUrlFilters: FilterValue[] = []
	for (let i = 0; i < valuesRute.length; i++) {
		for (let j = 0; j < filterOptions.length; j++) {
			if (
				valuesRute[i].name.includes(filterOptions[j]) &&
				valuesRute[i].value
			) {
				valuesUrlFilters.push(valuesRute[i])
			}
		}
	}
	valuesUrlFilters = [...new Set(valuesUrlFilters)]
	const newUrl = valuesUrlFilters
		.map(({ name, value }) => `${name}=${value}`)
		.join('&')

	return resultsUrl + newUrl
}
