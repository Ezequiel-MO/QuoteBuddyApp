// Define the FilterValue interface
export interface FilterValue {
	name: string
	value?: string | number
}

// Define the FilterParams interface
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

// Define the FilterDocumentLengthParams interface
interface FilterDocumentLengthParams {
	valuesRute: FilterValue[]
	url: string
	filterOptions: string[]
}

// Function to filter document length
export const filterDocumentLength = ({
	valuesRute,
	url,
	filterOptions
}: FilterDocumentLengthParams): string => {
	const valuesUrlFilters = valuesRute.filter(
		({ name, value }) =>
			filterOptions.some((option) => name.includes(option)) &&
			value !== undefined
	)

	const filterString = valuesUrlFilters
		.map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
		.join('&')

	return `${url}?${filterString}`
}

// Define the FilterTransfersParams interface
interface FilterTransfersParams extends FilterParams {
	page: number
}

// Function to filter transfers
export const filterTransfers = ({
	valuesRute,
	url,
	filterOptions,
	page
}: FilterTransfersParams): string => {
	const valuesUrlFilters = valuesRute.filter(
		({ name, value }) =>
			filterOptions.some((option) => name.includes(option)) &&
			value !== undefined
	)

	const filterString = valuesUrlFilters
		.map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
		.join('&')

	return `${url}?page=${page}&limit=100&${filterString}`
}
