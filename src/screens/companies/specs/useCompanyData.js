import { useState } from 'react'

export const useCompanyData = (
	initialData,
	setInitialData,
	validate,
	setErrors
) => {
	const [data, setData] = useState(initialData)

	const handleChange = (event) => {
		const newData = {
			...data,
			[event.target.name]: event.target.value
		}
		setData(newData)
		setErrors(validate(newData))
		setInitialData(newData)
	}

	const handleColor = (event) => {
		if (!data.colorPalette.includes(event.target.value)) {
			setData({
				...data,
				colorPalette: [...data.colorPalette, event.target.value]
			})
		}
	}

	const handleSelect = (event) => {
		setData({
			...data,
			employees:
				event.target.value === 'none'
					? data.employees
					: !data.employees.includes(event.target.value)
					? [...data.employees, event.target.value]
					: data.employees
		})
	}

	const handleDelete = (event) => {
		setData({
			...data,
			colorPalette: data.colorPalette.filter((el) => el !== event)
		})
	}

	const handleDeleteClient = (event) => {
		setData({
			...data,
			employees: data.employees.filter((el) => el !== event)
		})
	}

	return {
		data,
		handleChange,
		handleColor,
		handleSelect,
		handleDelete,
		handleDeleteClient
	}
}
