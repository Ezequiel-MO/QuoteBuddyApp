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

const appendPagination = (url: string, page: number, limit: string) => {
	return `${url}?page=${page}&limit=${limit}`
}

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

const appendFiltersToUrl = (url: string, valuesUrlFilters: FilterValue[]) => {
	const filterString = valuesUrlFilters
		.map(({ name, value }) => `&${name}=${value}`)
		.join('')
	return `${url}${filterString}`
}

export const filter = ({
	valuesRute,
	url,
	filterOptions,
	page,
	limit = '10',
	includePagination = true
}: FilterParams): string => {
	let resultsUrl = includePagination ? appendPagination(url, page, limit) : url

	const valuesUrlFilters = filterValues(valuesRute, filterOptions)
	return appendFiltersToUrl(resultsUrl, valuesUrlFilters)
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
}: FilterDocumentLengthParams) => {
	let resultsUrl = `${url}?`
	const valuesUrlFilters = []
	for (let i = 0; i < valuesRute.length; i++) {
		for (let j = 0; j < filterOptions.length; j++) {
			if (valuesRute[i].name.includes(filterOptions[j])) {
				valuesRute[i].value && valuesUrlFilters.push(valuesRute[i])
			}
		}
	}
	let newUrl = ''
	if (valuesUrlFilters.length > 0) {
		for (let i = 0; i < valuesUrlFilters.length; i++) {
			newUrl =
				newUrl + `&${valuesUrlFilters[i].name}=${valuesUrlFilters[i].value}`
		}
	}
	let finalUrl = resultsUrl + newUrl
	return finalUrl
}

interface FilterTransfersParams extends FilterParams {
	page: number
}
export const filterTransfers = ({
	valuesRute,
	url,
	filterOptions,
	page
}: FilterTransfersParams) => {
	let resultsUrl = `${url}?page=${page}&limit=100`
	let valuesUrlFilters = []
	for (let i = 0; i < valuesRute.length; i++) {
		for (let j = 0; j < filterOptions.length; j++) {
			if (valuesRute[i].name.includes(filterOptions[j])) {
				valuesRute[i].value && valuesUrlFilters.push(valuesRute[i])
				typeof valuesRute[i].value === 'boolean' &&
					valuesUrlFilters.push(valuesRute[i])
			}
		}
	}
	valuesUrlFilters = [...new Set(valuesUrlFilters)]
	if (
		valuesUrlFilters.length === 1 &&
		valuesUrlFilters[0].name === 'vehicleCapacity'
	) {
		valuesUrlFilters.pop()
	}
	let newUrl = ''
	if (valuesUrlFilters.length > 0) {
		for (let i = 0; i < valuesUrlFilters.length; i++) {
			newUrl =
				newUrl + `&${valuesUrlFilters[i].name}=${valuesUrlFilters[i].value}`
		}
	}
	let finalUrl = resultsUrl + newUrl
	return finalUrl
}
