import { useState, useEffect, useCallback } from 'react'

export const useFilterList = (initialData, filterFunction) => {
	const [data, setData] = useState(initialData)
	const [filteredData, setFilteredData] = useState(initialData)
	const [searchTerm, setSearchTerm] = useState('')

	useEffect(() => {
		setFilteredData(data)
	}, [data])

	const filterList = useCallback(
		(e) => {
			setSearchTerm(e.target.value)
			const result = data.filter((item) => filterFunction(item, e.target.value))
			setFilteredData(result)
			if (searchTerm === '') {
				setFilteredData(data)
			}
		},
		[data, searchTerm, filterFunction]
	)

	return { filteredData, searchTerm, filterList, setData }
}
