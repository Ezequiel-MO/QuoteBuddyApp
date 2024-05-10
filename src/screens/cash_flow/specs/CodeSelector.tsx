import React, { useEffect, useState } from 'react'
import { useApiFetch } from 'src/hooks/fetchData'
import { usePayment } from '../context/PaymentsProvider'

interface Props {
	codes: string[]
}

export const CodeSelector = ({ codes }: Props) => {
	const { state, handleChange } = usePayment()

	const [filteredCodes, setFilteredCodes] = useState<string[]>(codes)
	const [searchTerm, setSearchTerm] = useState('')

	useEffect(() => {
		const newFilteredCodes =
			searchTerm.trim() === ''
				? codes
				: codes.filter((code) =>
						code.toLowerCase().includes(searchTerm.toLowerCase())
				  )

		if (JSON.stringify(newFilteredCodes) !== JSON.stringify(filteredCodes)) {
			setFilteredCodes(newFilteredCodes)
		}
	}, [searchTerm, codes, filteredCodes])

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
	}

	return (
		<div className="code-selector">
			<label
				htmlFor="code-search"
				className="block text-sm font-medium text-gray-300"
			>
				Search Project Code
			</label>
			<input
				type="text"
				id="code-search"
				value={searchTerm}
				onChange={handleSearch}
				className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				placeholder="Type to search..."
			/>
			<label
				htmlFor="code-select"
				className="block text-sm font-medium text-gray-300 mt-4"
			>
				Select Project Code
			</label>
			<select
				id="code-select"
				name="projectCode"
				value={state.payment?.projectCode || ''}
				onChange={handleChange}
				className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			>
				<option value="">Select a code...</option>
				{filteredCodes.map((code) => (
					<option key={code} value={code}>
						{code}
					</option>
				))}
			</select>
		</div>
	)
}
