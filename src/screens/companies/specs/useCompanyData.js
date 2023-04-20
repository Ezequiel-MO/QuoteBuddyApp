import { useState, useCallback } from 'react'

export const useCompanyData = (
	initialData,
	setInitialData,
	validate,
	setErrors
) => {
	const [data, setData] = useState(initialData)

	const updateData = useCallback(
		(newData) => {
			setData(newData)
			setErrors(validate(newData))
			setInitialData(newData)
		},
		[setErrors, setInitialData, validate]
	)

	const handleChange = useCallback(
		(event) => {
			const newData = {
				...data,
				[event.target.name]: event.target.value
			}
			updateData(newData)
		},
		[data, updateData]
	)

	const handleColor = useCallback(
		(event) => {
			if (!data.colorPalette.includes(event.target.value)) {
				const newData = {
					...data,
					colorPalette: [...data.colorPalette, event.target.value]
				}
				setData(newData)
			}
		},
		[data]
	)

	const handleSelect = useCallback(
		(event) => {
			const newData = {
				...data,
				employees:
					event.target.value === 'none'
						? data.employees
						: !data.employees.includes(event.target.value)
						? [...data.employees, event.target.value]
						: data.employees
			}
			setData(newData)
		},
		[data]
	)

	const handleDeleteColor = useCallback(
		(color) => {
			const newData = {
				...data,
				colorPalette: data.colorPalette.filter((el) => el !== color)
			}
			setData(newData)
		},
		[data]
	)

	const handleDeleteClient = useCallback(
		(client) => {
			const newData = {
				...data,
				employees: data.employees.filter((el) => el !== client)
			}
			setData(newData)
		},
		[data]
	)

	return {
		data,
		handleChange,
		handleColor,
		handleSelect,
		handleDeleteColor,
		handleDeleteClient
	}
}
