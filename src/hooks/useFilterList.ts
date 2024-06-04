import { useState, useEffect, useCallback } from 'react'

type FilterFunction<T> = (item: T, term: string) => boolean

export const useFilterList = <T>(
	initialData: T[],
	filterFunction: FilterFunction<T>
) => {
	const [data, setData] = useState<T[]>(initialData)
	const [filteredData, setFilteredData] = useState<T[]>(initialData)
	const [searchTerm, setSearchTerm] = useState('')

	useEffect(() => {
		setFilteredData(data.filter((item) => filterFunction(item, searchTerm)))
	}, [data, searchTerm])

	const filterList = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const newSearchTerm = e.target.value
		setSearchTerm(newSearchTerm)
	}, [])

	return { filteredData, searchTerm, filterList, setData }
}
