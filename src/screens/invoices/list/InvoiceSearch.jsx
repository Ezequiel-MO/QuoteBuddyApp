import { useState } from 'react'

export const InvoiceSearch = ({ onFilter }) => {
	const [searchItem, setSearchItem] = useState('')

	const handleChange = (e) => {
		const { value } = e.target
		setSearchItem(value)
		onFilter(value)
	}

	return (
		<input
			type="text"
			placeholder="Search invoices"
			value={searchItem}
			onChange={handleChange}
		/>
	)
}
